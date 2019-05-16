import React, { useEffect } from 'react';
import './App.css';
import useReduxState from './useReduxState';
import api from './api';
import FillInTheBlank from './exercises/FillInTheBlank';
import Association from './exercises/Association';
import ImageAssociation from './exercises/ImageAssociation';
import Dictionary from './Dictionary';

const ExerciseTypes = {
    FILL_BLANK: 0,
    ASSOC: 1,
    IMG_ASSOC: 2
}

const RES_MOCK = [
    [45,42,52,49,48,50,47,51,46,44],
    [54,62,53,61,58,59,60,55,57,56],
    [68,72,66,70,67,64,69,63,71,65],
    [74,77,73,81,75,80,79,78,76,82],
    [85,87,88,91,94,86,90,83,84,89]
]

function App() {

    const [ getState, setState ] = useReduxState({
        loadingExercises: true,
        exercises: [],
        currentExercise: 0,
        error: null,
        responses: [],
        dictionary: null
    })

    const {
        loadingExercises,
        exercises,
        error,
        currentExercise,
        responses,
        dictionary
    } = getState()

    const qs = new URLSearchParams(window.location.search)
    const test_id = qs.get('test_id')
    const user_id = qs.get('user_id')

    useEffect(() => {


        if (!test_id) {
            api.get(`/user/${user_id}/dictionary`).then(({ data: dictionary }) => {
                setState({ dictionary })
            })
            return
        }

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
        const { data: corrections } = await api.post(`test/${test_id}/solve`, responses)

        
    }

    const exerciseProps = {
        exercise,
        onChange: updateResponse,
        response: responses[currentExercise]
    }

    if (dictionary) {
        return (
            <div className="flex-row center-a">
                <div className="container flex-col">
                    <Dictionary translations={dictionary} />
                </div>
            </div>
        )
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
