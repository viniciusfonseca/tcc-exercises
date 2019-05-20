import React from 'react'
import api from './api';

const Dictionary = ({
    translations,
    onRemove = (id) => void 0,
    onRemoveAll = () => void 0
}) => {

    const removeTranslation = async id => {
        if (!window.confirm("Deseja mesmo remover esta tradução do seu dicionário?")) { return }

        await api.delete(`/translation/${id}`)

        onRemove(id)
    }

    const removeAllTranslations = async () => {
        if (!window.confirm("Deseja mesmo remover todas as traduções do seu dicionário?")) { return }

        await api.get(`/user/:id/dictionary/reset`)

        onRemoveAll()
    }

    if (translations.length === 0) {
        return <strong> Você ainda não traduziu um termo. </strong>
    }

    return (
        <div className="flex-col">
            <div className="flex-row center-b" style={{ marginBottom: '20px' }}>
                <strong className="flex"> Palavras no dicionário: { translations.length } </strong>
                <div className="button" onClick={removeAllTranslations}> Remover todas as palavras </div>
            </div>
            <table>
                <thead>
                    <th> Termo </th>
                    <th> Tradução </th>
                </thead>
                {
                    translations.map(({ translated, translation, id }, i) =>
                        <tr key={`tr-${i}`}>
                            <td>{ translated }</td>
                            <td>
                                <span className="flex-row">
                                    <span style={{ width: '20px' }}></span>
                                    <span className="flex-row center-a flex">
                                        { translation }
                                    </span>
                                    <span onClick={() => removeTranslation(id)} style={{ width: '20px', background: 'red', color: '#FFF', borderRadius: '10px', cursor: 'pointer' }}>
                                        X
                                    </span>
                                </span>
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Dictionary