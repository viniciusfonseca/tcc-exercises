import React from 'react'

const Dictionary = ({
    translations
}) => {

    if (translations.length === 0) {
        return <strong> Você ainda não traduziu um termo. </strong>
    }

    return (
        <table>
            <thead>
                <th> Termo </th>
                <th> Tradução </th>
            </thead>
            {
                translations.map(({ translated, translation }, i) =>
                    <tr key={`tr-${i}`}>
                        <td>{ translated }</td>
                        <td>{ translation }</td>
                    </tr>
                )
            }
        </table>
    )
}

export default Dictionary