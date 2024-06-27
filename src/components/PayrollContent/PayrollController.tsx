import React, {useEffect, useState} from "react";
import { PayrollEmployeeTable } from "../StyledTable/PayrollEmployeeTable";
import { IEmployeeData, IEmployeeRows } from "../../types/interfaces/employeeModels";
import { EmployeeEditComponenet } from "./EmployeeEditComponent";
import { createBlankUserData } from "../../utils/createStructure";
import { getEmployeeProfile } from "../../services/apiService";
import '../../styles/ButtonStyles.css';
import { getNextEmployeeNumber } from "../../utils/numberConverters";

export const PayrollController = () => {

    
    const [tableData, setTableData] = useState<IEmployeeRows[]>([]);
    const [employeeProfileData, setEmployeeProfileData] = useState<IEmployeeData[]>([]);
    const [employeeSelectedData, setEmployeeSelectedData] = useState<IEmployeeData>(createBlankUserData(0));
    const tableHeaders:string[] = [
        'Employee #',
        'First Name',
        'Last Name',
        'Salutation',
        'Profile Colour'
    ];

   useEffect(()=>{
    getUserProfiles();
   },[]);
 
   /** API call to get all the data from DB */
   const getUserProfiles = () =>{
    getEmployeeProfile()
        .then((data) => {
            setEmployeeProfileData(data);
            setTableData([]);
            data.map((rows:IEmployeeData) => {
                return setTableData((prevData) => [...prevData, 
                    {
                        employeeNumber:rows.employeeNumber,
                        fistName:rows.firstName,
                        lastName: rows.lastName,
                        salutation: rows.salutation,
                        profileColour:rows.profileColour, 
                    }]);
            });
    });

   }

   /** Sets data on for the table
    * This will be updated on a new Employee added.
    */
    const employeeTableSelection = (employeeNumber:number) => {
        employeeProfileData.map((data) => data.employeeNumber === employeeNumber && setEmployeeSelectedData(data));
    }

    return(
        <>
            <div className="container-header">
                <h3 style={{marginLeft:'70px'}}>Current Employees</h3>
                    <button
                        className="add-user-btn"
                        onClick={()=>setEmployeeSelectedData(createBlankUserData(getNextEmployeeNumber(employeeProfileData)))} 
                >Add Employee</button>
            </div>
            <div>
                <PayrollEmployeeTable 
                    headers={tableHeaders} 
                    rows={tableData} 
                    onSelection={employeeTableSelection}
                />
                <EmployeeEditComponenet 
                    data={employeeSelectedData}
                    onSave={getUserProfiles}
                />    
            </div>
        </>
    )
}