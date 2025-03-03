import { useState } from 'react';
import './ListComponent.css';





export function ListComponent() {
    const [inputNameBoard, setInputNameBoard] = useState('List');


    return (
        <div className="listComponent">
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