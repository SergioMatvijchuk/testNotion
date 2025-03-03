import './EmptyPage.css';
import { useState } from 'react';

export function EmptyPage() {
    const [inputNameBoard, setInputNameBoard] = useState('Empty page');

    return (
        <div className="emptyPage">
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