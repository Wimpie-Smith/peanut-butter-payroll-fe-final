import React, { useState } from "react"
import './tableStyles.css'
import { IEmployeeRows } from "../../types/interfaces/employeeModels";

interface ITableProps {
    onSelection: (id:number)=>void;
    headers: string[];
    rows:IEmployeeRows[];
}

export const PayrollEmployeeTable:React.FC<ITableProps> = ({headers, rows, onSelection}) => {

    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

    const handleRowClick = (index: number) => {
        setSelectedRowIndex(index);
    };


    return (
        <div >
            <table className="user-table-body">
                <thead>
                    <tr>
                        {headers.map((header, idx)=>(
                            <th key={idx}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                  {rows.map((row, cellIndex)=>(
                    <tr key={row.employeeNumber}  className={selectedRowIndex === cellIndex ? 'selected' : ''}
                        onClick={() => {
                            handleRowClick(cellIndex);
                            onSelection(row.employeeNumber);
                        }}
                    >
                        <td>{row.employeeNumber}</td>
                        <td>{row.fistName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.salutation}</td>
                        <td>
                        <span 
                            style= {
                                { 
                                    display: 'inline-block', 
                                    width: '5px', 
                                    height: '15px', 
                                    backgroundColor: row.profileColour, 
                                    marginRight: '5px' 
                                }
                            }
                        />
                            {row.profileColour}
                        </td>
                    </tr>
                
                  ))}
                </tbody>

                </table>
        </div>
    )
}