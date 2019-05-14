import React, { useEffect } from 'react';
import './App.css';
import useReduxState from './useReduxState';
import api from './api';
import FillInTheBlank from './exercises/FillInTheBlank';
import Association from './exercises/Association';
import ImageAssociation from './exercises/ImageAssociation';

const ExerciseTypes = {
    FILL_BLANK: 0,
    ASSOC: 1,
    IMG_ASSOC: 2
}

function App() {

    const [getState, setState] = useReduxState({
        loadingExercises: true,
        exercises: [],
        currentExercise: 0,
        error: null,
        responses: []
    })

    const {
        loadingExercises,
        exercises,
        error,
        currentExercise,
        responses
    } = getState()

    useEffect(() => {

        const test_id = new URLSearchParams(window.location.search).get('test_id')

        api.get(`/test/${test_id}`).then(
            ({ data: test }) => {
                setState({
                    exercises: test.exercises,
                    loadingExercises: false,
                    responses: Array(test.exercises.length).fill(0).map((_, i) => Array(test.exercises[i].col1.length).fill(""))
                })
            }
        )
        .catch(
            () => setState({
                error: true,
                loadingExercises: false
            })
        )

    }, [])

    const exercise = exercises[currentExercise]

    const nextExercise = () => {
        setState({ currentExercise: currentExercise + 1 })
    }

    const prevExercise = () => {
        setState({ currentExercise: currentExercise - 1 })
    }

    const updateResponse = response => {
        setState({ responses: responses.map((res, i) => currentExercise !== i ? res : response) })
    }

    const solveTest = async () => {
        
    }

    const exerciseProps = {
        exercise,
        onChange: updateResponse,
        response: responses[currentExercise]
    }

    return (
        <div className="flex-row center-a">
            <div className="container flex-col">
                {
                    loadingExercises ?
                        <img src="/spinner.svg" /> :
                        !error &&
                        (
                            <div className="flex-col">
                                <div className="flex-row center-b">
                                    <h2 className="flex"> Exercício { currentExercise + 1 } </h2>
                                    {
                                        currentExercise > 0 &&
                                        <div className="button" style={{ marginRight: '10px' }} onClick={prevExercise}> Voltar </div>
                                    }
                                    {
                                        currentExercise < exercises.length - 1 ?
                                        <div className="button" onClick={nextExercise}> Avançar </div> :
                                        <div className="button" onClick={solveTest}> Concluído </div>
                                    }
                                </div>
                                {
                                    currentExercise === exercises.length - 1 &&
                                    JSON.stringify(responses)
                                }
                                {
                                    loadingExercises ? null :
                                    exercise.type === ExerciseTypes.FILL_BLANK ?
                                        <FillInTheBlank {...exerciseProps} /> :
                                    exercise.type === ExerciseTypes.IMG_ASSOC ?
                                        <ImageAssociation {...exerciseProps} /> :
                                    exercise.type === ExerciseTypes.ASSOC ?
                                        <Association {...exerciseProps} /> :
                                    null
                                }
                                </div>
                        )
                    }

                {
                    error &&
                    <h4 className="flex-row center-a"> Ocorreu um erro ao buscar a prova. </h4>
                }
                
            </div>
        </div>
    );
}

export default App;
