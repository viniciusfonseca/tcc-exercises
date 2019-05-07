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
        error: null
    })

    const {
        loadingExercises,
        exercises,
        error,
        currentExercise
    } = getState()

    useEffect(() => {

        const test_id = new URLSearchParams(window.location.search).get('test_id')

        api.get(`/test/${test_id}`).then(
            ({ data: test }) => {
                setState({ exercises: test.exercises })
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

    return (
        <div className="container flex-col">
            {
                loadingExercises ?
                    <img src="/spinner.svg" /> :
                    !error &&
                    (
                        <div className="flex-col">
                            <div className="flex-row center-b">
                                <h2 className="flex"> Exercício { currentExercise + 1 } </h2>
                                <div className="button" onClick={nextExercise}> Avançar </div>
                            </div>
                            {
                                exercise.type === ExerciseTypes.FILL_BLANK ?
                                    <FillInTheBlank exercise={exercise} /> :
                                exercise.type === ExerciseTypes.IMG_ASSOC ?
                                    <ImageAssociation exercise={exercise} /> :
                                exercise.type === ExerciseTypes.ASSOC ?
                                    <Association exercise={exercise} /> :
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
    );
}

export default App;
