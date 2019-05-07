import React, { useEffect } from 'react'
import useReduxState from '../useReduxState';

const Association = ({ exercises }) => {

    const [ getState, setState ] = useReduxState({
        translations: [],
        loadingTranslations: true
    })

    useEffect(() => {

    }, [])

    const { translations, loadingTranslations } = getState()

    return (
        <div className="flex-col">
            <p> Associe as palavras às suas respectivas traduções. </p>
            <div className="flex-row">
                <div className="flex-col flex word-col">
                <span>1. dog</span>
                <span>2. table</span>
                <span>3. book</span>
                <span>4. food</span>
                <span>5. airplane</span>
                <span>6. car</span>
                <span>7. hello</span>
                <span>8. woman</span>
                <span>9. computer</span>
                <span>10. glass</span>
                </div>
                <div className="flex-col flex word-col">
                    <span><select></select> livro </span>
                    <span><select></select> avião </span>
                    <span><select></select> olá </span>
                    <span><select></select> cachorro </span>
                    <span><select></select> mulher </span>
                    <span><select></select> carro </span>
                    <span><select></select> computador </span>
                    <span><select></select> vidro </span>
                    <span><select></select> mesa </span>
                    <span><select></select> comida </span>
                </div>
            </div>
        </div>
    )
}

export default Association