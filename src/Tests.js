import React from 'react'

const STATUS_LABEL = {
    PENDING: "Pendente",
    DONE: "Concluída"
}

const SATUS_LABEL_ACTION = {
    PENDING: "Fazer",
    DONE: "Refazer"
}

const Tests = ({ tests }) => {

    return (
        <React.Fragment>
        {
            tests.map(
                ({ id, status, points }, i) =>
                    <div className="flex-col" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                        <h2> Prova #{i + 1} - { STATUS_LABEL[status] } - <a href={`?test_id=${id}`}> { SATUS_LABEL_ACTION[status] } </a> </h2>
                    </div>
            ).reverse()
        }
        </React.Fragment>
    )
}

export default Tests