import { EProfileColours } from "../enums/userProfileEnum";

export interface IEmployeeRows {
    employeeNumber:number;
    fistName:string;
    lastName:String;
    salutation:String;
    profileColour:EProfileColours | string;
}

export interface IEmployeeData {
    employeeNumber:number;
    firstName:string;
    lastName:string;
    salutation:string;
    gender:string;
    fullNames:string;
    grossSalary:number;
    profileColour:EProfileColours | string;
}