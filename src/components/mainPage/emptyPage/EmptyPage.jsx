import {
    getEmptyPagesFromLocalStorage,
    setEmptyPagesToLoclStorage,
    updateEmptyPageInLocalStorage,
    deleteEmptyPageFromLocalStorage
} from '../../../dataManager';
import './EmptyPage.css';
import { useEffect, useState } from 'react';


export function EmptyPage(state) {
    const pageProps = {
        setComponent: state.data.setComponent,
        banner: state.data.banner,
        icon: state.data.icon,
        id: state.data.id,
        slug: state.data.slug,
        title: state.data.title,
        type: state.data.type,
        content: state.data.content

    };
    const [inputNameBoard, setInputNameBoard] = useState('');
    const [textComponent, setTextComponent] = useState('');

    useEffect(() => {
        setInputNameBoard(pageProps.title);
        setTextComponent(pageProps.content?.text || null);
    }, [state]);



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
                <textarea className='cardBoxEmpty scrollableVertical' value={textComponent} onChange={(e) => {
                    setTextComponent(e.target.value);
                }} type="text" name="" id="" />
            </div>

        </div>
    )
}