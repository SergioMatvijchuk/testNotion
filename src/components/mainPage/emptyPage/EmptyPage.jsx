import './EmptyPage.css';
import { useState } from 'react';

export function EmptyPage({ cardName }) {
    const [inputNameBoard, setInputNameBoard] = useState(cardName);
 

    return (
        <div className="emptyPage">
            <div>
                <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                    setInputNameBoard(e.target.value);
                }
                } />
                <hr />
            </div>
            <div>
                <textarea className='cardBoxEmpty scrollableVertical' type="text" name="" id="" />
            </div>

        </div>
    )
}