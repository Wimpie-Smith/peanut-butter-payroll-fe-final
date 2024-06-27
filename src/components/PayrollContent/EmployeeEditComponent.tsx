import React, { useEffect, useState } from "react"
import { StyledInput } from "../StyledInputs/StyledInput";
import { StyledDropDown } from "../StyledInputs/StyledDropDown";
import { StyledGenderSelection } from "../StyledInputs/StyledGenderSlection";
import { StyledProfileColourSelection } from "../StyledInputs/StyledProfileColourSelection";
import { IEmployeeData } from "../../types/interfaces/employeeModels";
import { EGenderNames, EGenderSelection, EProfileColours } from "../../types/enums/userProfileEnum";
import '../../styles/EmployeeInfoEditorStyles.css'
import { createOrUpdateUserProfile } from "../../services/apiService";
import { createBlankUserData } from "../../utils/createStructure";
import '../../styles/ButtonStyles.css'
import customToaster from "../../utils/toaster";

interface IProps {
    data: IEmployeeData; 
    onSave: ()=>void; 
}

export const EmployeeEditComponenet:React.FC<IProps> = ({data, onSave}) => {
    const [empData, setEmpData] = useState<IEmployeeData>(data);
    const [profileColour, setProfileColour] = useState<{background:EProfileColours}>({background:EProfileColours.defualt});
    const [validateData, setValidateData] = useState<boolean>(false);

    useEffect(()=>{
        setEmpData(data);
    },[data])

    /** Handels selection of dropdown and sets the Gender selections */
    const handleDropDownChange = (selection:string) => {
        let newSalutation = '';
        let newGender = '';
    
        switch (selection) {
          case EGenderSelection.dr:
            newSalutation = EGenderSelection.dr;
            newGender = EGenderNames.none;
            break;
          case EGenderSelection.mr:
            newSalutation = EGenderSelection.mr;
            newGender = EGenderNames.male;
            break;
          case EGenderSelection.mrs:
            newSalutation = EGenderSelection.mrs;
            newGender = EGenderNames.female;
            break;
          case EGenderSelection.ms:
            newSalutation = EGenderSelection.ms;
            newGender = EGenderNames.female;
            break;
          case EGenderSelection.mx:
            newSalutation = EGenderSelection.mx;
            newGender = EGenderNames.unspecified;
            break;
          case EGenderSelection.none:
            newSalutation = EGenderSelection.none;
            newGender = EGenderNames.none;
            break;
          default:
            break;
        }

        setEmpData(prevState => ({
            ...prevState,
            salutation: newSalutation,
            gender: newGender
          }));
    }

    /** Update the state with the require field
     * @param field Key of the item to update
     * @param value Value of item.
     */
    const handleInputChange = (field: keyof IEmployeeData, value: string | number) => {
        setEmpData({
          ...empData,
          [field]: value,
        });
      };

      /**  Handles the provile colour changer to set the save button */
      const profileColourChangeHandler = (colourValue:EProfileColours) =>{
        setProfileColour({background:colourValue});
        handleInputChange('profileColour', colourValue);
      }

      /** Validation of required Items */
      const validation = ():boolean => {
        const validFirstName = empData.firstName.trim() !== '';
        const validLastName = empData.lastName.trim() !== '';
        const validEmpNumber = empData.employeeNumber ? true : false;
        const validGenderSelection = empData.gender !== '';
        const validateSalutation = empData.salutation !== '';
       
        setValidateData(true);
        
        const validate:boolean = validFirstName && validLastName && validEmpNumber && validGenderSelection && validateSalutation;
        if ( validate) {
            return true;
        } else {
            customToaster(false, 'Validation Failed', 'Please complete required fields');
            return false;
        }
      }

      /** Sends data to back end for save */
      const presistHanlder = () => {
        if (validation()) {
            createOrUpdateUserProfile(empData).then( ()=> {
                onSave();
                setEmpData(createBlankUserData(empData.employeeNumber + 1));
                setValidateData(false);
            });
        }
      }


    return(
        <div  className="container">
            <h3 className="title">Employee Information</h3>
            <div className="buttons">
                <button 
                    className="cancel-btn" 
                    onClick={()=>setEmpData(data)}
                >Cancel</button>
                <button 
                    className="save-btn" 
                    style={profileColour} 
                    onClick={()=>presistHanlder()}
                >Save</button>
            </div>
            <div className="section-wrapper">

                <div className="section">
                    <StyledInput 
                        label={'First Name(s)'} 
                        isAlpOnly 
                        value={empData.firstName} 
                        onChange={(val:string|number)=>handleInputChange('firstName', val)} 
                        requiredField
                        validate={validateData}
                    />
                    <StyledInput 
                        label={'Last Name'} 
                        isAlpOnly 
                        value={empData.lastName} 
                        onChange={(val:string|number)=>handleInputChange('lastName', val)}
                        requiredField
                        validate={validateData}
                    />
                    <StyledDropDown 
                        lable={'Salutation'} 
                        onSelect={handleDropDownChange}
                        value={empData.salutation}
                        requiredField
                        validate={validateData}
                    />
                    <StyledGenderSelection 
                        selection={empData.gender as EGenderNames}
                        requiredField
                        validate={validateData}
                        onChange={(val:string)=>handleInputChange('gender', val)}
                    />
                    <StyledInput 
                        label={'Employee #'} 
                        isNumberOnly 
                        value={empData.employeeNumber} 
                        onChange={(val:string|number)=>handleInputChange('employeeNumber', val)}
                        requiredField
                        validate={validateData}
                    />
                </div>

                <div className="section">
                    <StyledInput 
                    label={'Full Name'} 
                    value={empData.firstName + ' ' + empData.lastName} 
                    onChange={()=>{}}
                    disabled
                    />
                    <StyledInput 
                    label={'Gross Salary $PY'} 
                    value={empData.grossSalary} 
                    onChange={(val:string|number)=>handleInputChange('grossSalary', val)}
                    isNumberOnly
                    enableGrouping
                    />
                    <StyledProfileColourSelection onChange={profileColourChangeHandler} colourValue={empData.profileColour}/>
                </div>
            </div>
        </div>
    )

}