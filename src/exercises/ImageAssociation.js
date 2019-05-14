import React from 'react'
import { API_URL } from '../api';
import useReduxState from '../useReduxState';

const WordThumbnail = ({ query }) =>
    <div className="flex-col center-b thumb-wrap">
        <img src={`${API_URL}/image?q=${query}`} />
        ({ query })
    </div>

const ImageAssociation = ({ exercise, response, onChange }) => {

    const [ getState, setState ] = useReduxState({
        col2res: response
    }, [exercise])

    const { col2res } = getState()

    const setCol2Res = (i, id) => {
        const nextCol2Res = col2res.map(
            (id0, j) => i !== j ? id0 : id
        )
        setState({ col2res: nextCol2Res })
        onChange(nextCol2Res)
    }

    return (
        <div className="flex-col">
            <p> Associe as palavras às suas respectivas figuras. </p>
            <div className="flex-row">
                <div className="flex-col flex word-col">
                {
                    exercise.col1.map(
                        ({ text }, i) => <span key={`col1-${i}`} className="flex-col center-a thumb-wrap">{i+1}. {text}</span>
                    )
                }
                </div>
                <div className="flex-col flex word-col">
                {
                    exercise.col2.map(
                        (text, i) =>
                            <span className="flex-row center-b" key={`col2-${i}`}>
                                <select value={col2res[i]} onChange={event => setCol2Res(i, +event.target.value)}>
                                    <option disabled value=""></option>
                                    {
                                        exercise.col1.map(
                                            ({ text, id }, j) =>
                                                <option value={id} key={`opt-${i}-${j}`}>
                                                    {j + 1}. { text }
                                                </option>
                                        )
                                    }
                                </select>
                                <WordThumbnail query={text} />
                            </span>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default ImageAssociation