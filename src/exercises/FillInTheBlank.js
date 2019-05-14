import React from 'react'
import useReduxState from '../useReduxState';

const WordDrag = ({
    id,
    children
}) => {

    const setDraggedEl = () => {
        window.dragged = id
    }

    const unsetDraggedEl = () => {
        window.dragged = null
    }

    return (
        <span className="word-drag"
            draggable
            onDragStart={setDraggedEl}
            onDragEnd={unsetDraggedEl}> {children} </span>
    )
}

const FillInTheBlank = ({ exercise, response, onChange }) => {

    const [ getState, setState ] = useReduxState({
        col2res: response
    }, [exercise])

    const { col2res } = getState()

    const allowDragOver = e => {
        e.preventDefault()
    }

    const onDrop = () => {
        console.log(window.dragged)
    }

    const setBlankWidth = () => {

    }

    const unsetBlankWidth = () => {

    }

    return (
        <React.Fragment>
            <div>
                <p> Preencha as lacunas com as palavras mais adequadas. </p>
            </div>
            <div className="words">
            {
                exercise.col1.map(
                    ({ text, id }, i) => <WordDrag id={id} key={`col1-${i}`}> {text} </WordDrag>
                )
            }
            </div>
            <div className="fill">
            {
                exercise.col2.map(
                    (context, i) => {
                        const [ fp, sp ] = context.split("$word$")
                        return (
                            <div key={`ctx-${i}`} onDragOver={allowDragOver} onDrop={onDrop}>
                                {i+1}. { fp } <span className="blank"></span> { sp }
                            </div>
                        )
                    }
                )
            }
            </div>
        </React.Fragment>
    )
}

export default FillInTheBlank