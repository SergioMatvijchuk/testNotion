import './TemplatesComponent.css';
import { useState } from 'react';


export function TemplatesComponent() {
    const [inputNameBoard, setInputNameBoard] = useState('Templates');


    return (
        <div className="templates">
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