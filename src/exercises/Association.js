import React from 'react'
import useReduxState from '../useReduxState';

const Association = ({
    response,
    exercise,
    solution,
    solved,
    onChange
}) => {

    const [ getState, setState ] = useReduxState({
        col2res: response
    }, [exercise])

    const { col2res } = getState()

    const setCol2Res = (i, id) => {
        const nextCol2Res = col2res.map(
            (id0, j) => i !== j ? id0 : id
        )
        onChange(nextCol2Res)
        setState({ col2res: nextCol2Res })
    }

    return (
        <div className="flex-col">
            <p> Associe as palavras às suas respectivas traduções. </p>
            <div className="flex-row">
                <div className="flex-col flex word-col">
                {
                    exercise.col1.map(
                        ({ text }, i) => <span key={`col1-${i}`}>{i+1}. {text}</span>
                    )
                }
                </div>
                <div className="flex-col flex word-col">
                {
                    exercise.col2.map(
                        (text, i) => {
                            const correct = solved && col2res[i] === solution[i]
                            return (
                                <div className="flex-row center-b">
                                    <span className="flex-row" key={`col2-${i}`}>
                                        <select disabled={solved} value={col2res[i]} onChange={event => setCol2Res(i, +event.target.value)}>
                                            <option disabled value=""></option>
                                            {
                                                exercise.col1.map(
                                                    ({ text, id }, j) =>
                                                        <option value={id} key={`opt-${i}-${j}`}>
                                                            { j + 1 }. { text }
                                                        </option>
                                                )
                                            }
                                        </select>
                                        {text}
                                    </span>
                                    {
                                        solved &&
                                        <span className="flex-row">
                                        {
                                            correct ?
                                                <div style={{ color: 'green', fontSize: '28px' }}> &#10004; </div> :
                                                <div style={{ fontWeight: 'bold', color: 'red' }}> X </div>
                                        }
                                        </span>
                                    }
                                </div>
                            )
                        }
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Association