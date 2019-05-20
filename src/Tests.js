import React from 'react'

const STATUS_LABEL = {
    PENDING: "Pendente",
    DONE: "Concluída"
}

const STATUS_LABEL_ACTION = {
    PENDING: "Fazer",
    DONE: "Refazer"
}

const Tests = ({ tests }) => {

    if (tests.length === 0) {
        return <strong> Você ainda não tem uma prova. </strong>
    }

    return (
        <React.Fragment>
        {
            tests.map(
                ({ id, status, points, max_points }, i) =>
                    <div className="flex-col" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                        <h2> Prova #{i + 1} ({ STATUS_LABEL[status] }) - <a href={`?test_id=${id}`}> { STATUS_LABEL_ACTION[status] } </a> </h2>
                        {
                            status === "DONE" &&
                            <p> Você tirou { ((points / max_points || 0) * 10).toFixed(1) } nessa prova. </p>
                        }
                    </div>
            ).reverse()
        }
        </React.Fragment>
    )
}

export default Tests