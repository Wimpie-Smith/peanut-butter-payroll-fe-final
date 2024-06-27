import { IEmployeeData } from "../types/interfaces/employeeModels"

export const createBlankUserData = (nextEmpNumber:number):IEmployeeData => {
    return {
        employeeNumber:nextEmpNumber,
        firstName:'',
        lastName:'',
        salutation:'',
        gender:'',
        fullNames:'',
        grossSalary:0,
        profileColour:'Grey',
    }
}