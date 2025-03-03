import './Calendar.css';
import { useState } from 'react';



export function Calendar() {
    const [inputNameBoard, setInputNameBoard] = useState('Calendar');


    return (
        <div className="calendarComponent">
            <div>
                <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                    setInputNameBoard(e.target.value);
                }
                } />
                <hr />
            </div>
        </div>
    )
}