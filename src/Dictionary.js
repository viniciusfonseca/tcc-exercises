import React from 'react'

const Dictionary = ({
    translations
}) => {

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