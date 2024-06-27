import React, { useEffect, useState } from "react";
import { EGenderNames, EGenderSelection } from "../../types/enums/userProfileEnum";
import '../../styles/GenderSelectionComponentStyles.css'

interface IGenderSelectionProps {
    selection: EGenderNames;
    requiredField?:boolean;
    validate?:boolean;
    onChange: (genderSelection:string)=>void;
}

export const StyledGenderSelection: React.FC<IGenderSelectionProps> = (props) => {

    const[isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (props.requiredField && props.validate) {
            if(props.selection){
                setIsError(false);
           } else {
               setIsError(true);
           }
        } 
    }, [props.selection, props.validate]);

    const handleGenderChange = (newGender: EGenderNames) => {
        props.onChange(newGender);
    };

    return (
        <div className="input-container" >
            <span style={isError ? {color:'red'} : {color:'black'}}>Gender *</span>
            <div style={{display:'flex' , marginLeft:'-15px'}}>
                <input
                    type="radio"
                    name="gender"
                    value={EGenderNames.male}
                    checked={props.selection === EGenderNames.male}
                    onChange={() => {
                        handleGenderChange(EGenderNames.male);
                    }}
                />
                <span>Male</span>
                <input
                    type="radio"
                    name="gender"
                    value={EGenderSelection.ms}
                    checked={props.selection === EGenderNames.female}
                    onChange={() => {
                        handleGenderChange(EGenderNames.female);
                    }}
                />
                <span>Female</span>
                <input
                    type="radio"
                    name="gender"
                    value={EGenderNames.unspecified}
                    checked={props.selection === EGenderNames.unspecified}
                    onChange={() => {
                        handleGenderChange(EGenderNames.unspecified);
                    }}
                />
                <span>Unspecified</span>
            </div>
        </div>
    
    );
};
