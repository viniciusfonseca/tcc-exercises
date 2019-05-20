import React, { useEffect } from 'react';
import './App.css';
import useReduxState from './useReduxState';
import api from './api';
import FillInTheBlank from './exercises/FillInTheBlank';
import Association from './exercises/Association';
import ImageAssociation from './exercises/ImageAssociation';
import Dictionary from './Dictionary';
import Tests from './Tests';

const ExerciseTypes = {
    FILL_BLANK: 0,
    ASSOC: 1,
    IMG_ASSOC: 2
}

const APP_SECTION = {
    DICT: 0,
    TESTS: 1
}

function App() {

    const [ getState, setState ] = useReduxState({
        loadingExercises: true,
        exercises: [],
        currentExercise: 0,
        error: null,
        responses: [],
        dictionary: null,
        section: APP_SECTION.DICT,
        tests: [],
        solved: false,
        solutions: {}
    })

    const {
        loadingExercises,
        exercises,
        error,
        currentExercise,
        responses,
        dictionary,
        solved,
        section,
        tests,
        solutions
    } = getState()
    
    const qs = new URLSearchParams(window.location.search)
    const test_id = qs.get('test_id')
    const user_id = qs.get('user_id')

    useEffect(() => {

        window.__IDIOM_GYM_EXERCISE__ = true

        if (!test_id) {
            api.get(`/user/${user_id}/dictionary`).then(({ data: dictionary }) => {
                setState({ dictionary })
            })
            api.get(`/user/${user_id}/tests`).then(({ data: tests }) => {
                setState({ tests })
            })
            return
        }

        api.get(`/test/${test_id}`).then(
            ({ data: test }) => {
                const responses = {}
                for (const { id, col2 } of test.exercises) {
                    responses[id] = Array(col2.length).fill("")
                }
                setState({
                    exercises: test.exercises,
                    loadingExercises: false,
                    responses
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


    const nextExercise = () => {
        setState({ currentExercise: currentExercise + 1 })
    }

    const prevExercise = () => {
        setState({ currentExercise: currentExercise - 1 })
    }

    const updateResponse = response => {
        setState({
            responses: {
                ...getState().responses,
                [exercise.id]: response
            }
        })
    }

    const solveTest = async () => {
        const { data: solutions } = await api.post(`/test/${test_id}/solve`, responses)

        setState({
            solved: true,
            currentExercise: 0,
            solutions
        })

    }
    
    const changeSection = section => () => setState({ section })
    
    if (dictionary) {

        const onRemove = trId => {
            setState({ dictionary: dictionary.filter(({ id }) => id !== trId) })
        }

        const onRemoveAll = () => {
            setState({ dictionary: [] })
        }

        return (
            <div className="flex-row center-a">
                <div className="container flex-col">
                    <div className="flex-row" style={{ marginBottom: '15px' }}>
                        <div className="button" style={{ marginRight: '15px' }}
                            onClick={changeSection(APP_SECTION.DICT)}> Dicionário </div>
                        <div className="button"
                            onClick={changeSection(APP_SECTION.TESTS)}> Provas </div>
                    </div>
                {
                    section === APP_SECTION.DICT ?
                    <Dictionary
                        translations={dictionary}
                        onRemove={onRemove}
                        onRemoveAll={onRemoveAll}
                    /> :
                    section === APP_SECTION.TESTS ?
                    <Tests tests={tests} /> :
                    null
                }
                </div>
            </div>
        )
    }
    
    const exercise = exercises[currentExercise] || {}

    const exerciseProps = {
        exercise,
        onChange: updateResponse,
        response: responses[exercise.id],
        solution: solutions[exercise.id],
        solved
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
                                        !solved && <div className="button" onClick={solveTest}> Concluído </div>
                                    }
                                </div>

                                {
                                    solved &&
                                    <h3 style={{ color: 'green' }}>
                                        Prova concluída! Sua nota foi { ((solutions.points / solutions.total_points || 0) * 10).toFixed(1) } ({ solutions.points } acerto(s) de { solutions.total_points }).
                                        Você pode refazer esse teste, se quiser.
                                    </h3> }

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
