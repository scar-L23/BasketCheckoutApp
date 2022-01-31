import React from 'react';

export default function Datatable({ showHeaders, headers, cellContents, getCellContent, ...props}) {
    return (
        <div className="container">
            <table className="table table-borderless">
                <thead className="table-secondary">
                    <tr>
                        {showHeaders && headers.map((head, idx) => (
                            <th key={"table-header__" + idx}>{head.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {cellContents && cellContents.map((cell, index) => (
                        <tr key={"table-cell__" + index}>
                            {headers.map((head, idx) => (
                                <td key={"table-cell__" + index +"_"+ idx}>
                                    {getCellContent(head.key, cell)}
                                </td> 
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Datatable.defaultProps = {
    showHeaders: true,
    headers: [],
    cellContents: [],
    getCellContent: () => {}
}