import { useMemo, useReducer } from 'react'
import { createStore } from 'redux';

const reducer = (state, action) =>
    ({
        ...state,
        ...action.payload
    })

const useReduxState = (initialState = {}, deps = []) => {

    const store = useMemo(() => createStore(reducer, initialState), deps)
    const [ _, forceUpdate ] = useReducer(x => x + 1, 0)

    const getState = store.getState.bind(store)
    const setState = payload => {
        store.dispatch({ type: true, payload })
        forceUpdate()
    }

    const createFieldUpdater = field =>
        value =>
            setState({ [field]: value })

    return [
        getState,
        setState,
        createFieldUpdater
    ]
}

export default useReduxState