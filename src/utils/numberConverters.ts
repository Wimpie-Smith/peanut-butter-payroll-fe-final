import { IEmployeeData } from "../types/interfaces/employeeModels";

/** Converter file that host a selection of number converters */


/** Number grouping converter. Converts and groups number inputs with " ". eg. 1000000 to 1 000 000 */

export const convertNumberGrouping = (value:string): string => {
    const cleanedValue = value.replace(/\s/g, '');
    const numberValue = parseInt(cleanedValue, 10);
    if (!isNaN(numberValue)) {
        const formattedValue = numberValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
        return formattedValue.replace(/,/g, ' '); // Replace comma with space
    } else {
        return '';
    }
}

/** Get the next employee Number */

export const getNextEmployeeNumber = (empData:IEmployeeData[]) =>{
    return empData[empData.length -1].employeeNumber + 1
}