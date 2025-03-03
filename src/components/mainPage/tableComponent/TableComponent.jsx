import './TableComponent.css';
import { useState } from 'react';




export function TableComponent() {
    const [inputNameBoard, setInputNameBoard] = useState('Table');

    return (
        <div className="tableComponent">
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