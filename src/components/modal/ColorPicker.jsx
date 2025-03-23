import './ColorPicker.css';
import { ChromePicker } from 'react-color';
import { useState } from 'react';


export default function ColorPicker({ handleColorChange }) {

    const [color, setColor] = useState('#fff');
    const onColorPickerInfoChange = color => {
        console.log("Main Color Change", color);
        setColor(color.hex);
        handleColorChange(color);
    };


    return (
        <div className="color-picker-container">
            <div className="color-picker-cover" />
            <ChromePicker
                color={color}
                onChange={onColorPickerInfoChange}
                disableAlpha={true}
            />
        </div>
    )
}