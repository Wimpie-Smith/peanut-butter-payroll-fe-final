import React, { useEffect, useState } from 'react';
import '../../styles/profileColourSelectionStyles.css'
import { EProfileColours } from '../../types/enums/userProfileEnum';

interface ISelectionProps {
    onChange:(value:EProfileColours)=>void;
    colourValue:EProfileColours | string;
}

export const StyledProfileColourSelection:React.FC<ISelectionProps> = (props) => {
    const [selectedColor, setSelectedColor] = useState<EProfileColours|string>(EProfileColours.defualt);

    useEffect(()=> {
        setSelectedColor(props.colourValue);
        props.onChange(props.colourValue as EProfileColours);
    },[props.colourValue])

    const handleChange = (value:EProfileColours) => {
        setSelectedColor(value);
        props.onChange(value);
    };

    return (
        <div className="colour-selection">
            <span style={{marginRight: '15px'}}>Employee Profile Colour: </span>
            <label className="custom-radio">
                <input 
                    type="radio" 
                    name="profileColour" 
                    value="green" 
                    checked={selectedColor === EProfileColours.green} 
                    onChange={()=>handleChange(EProfileColours.green)}
                />
                <span>Green</span>
            </label>
            <label className="custom-radio">
                <input 
                    type="radio" 
                    name="profileColour" 
                    value="blue" 
                    checked={selectedColor === EProfileColours.blue} 
                    onChange={()=>handleChange(EProfileColours.blue)}
                />
                <span>Blue</span>
            </label>
            <label className="custom-radio">
                <input 
                    type="radio" 
                    name="profileColour" 
                    value="red" 
                    checked={selectedColor === EProfileColours.red} 
                    onChange={()=>handleChange(EProfileColours.red)}
                />
                <span>Red</span>
            </label>
            <label className="custom-radio">
                <input 
                    type="radio" 
                    name="profileColour" 
                    value="default" 
                    checked={selectedColor === EProfileColours.defualt} 
                    onChange={()=>handleChange(EProfileColours.defualt)}
                />
                <span>Default</span>
            </label>
        </div>
    );
};
