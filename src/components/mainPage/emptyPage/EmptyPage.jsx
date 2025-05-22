import {
    getEmptyPagesFromLocalStorage,
    setEmptyPagesToLoclStorage,
    updateEmptyPageInLocalStorage,
    deleteEmptyPageFromLocalStorage,
    putChangesOfPage
} from '../../../dataManager';
import './EmptyPage.css';
import { useEffect, useState, useRef } from 'react';


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

    const [page, setPage] = useState({});
    const lastPageRef = useRef({});
    const updateLeftMenu = state.updateLeftMenu; //при выходе обновляем левое меню 


    useEffect(() => {
        console.log("Entry to  Empty component");
        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": {
                "text": pageProps.content?.text,
            },
            "slug": pageProps.slug
        };
        setPage(initialPage)
        lastPageRef.current = initialPage;
    }, [state]);


    useEffect(() => {
        lastPageRef.current = page;
    }, [page]);


    useEffect(() => {
        return async () => {
            await putChangesOfPage(lastPageRef.current);
            await updateLeftMenu();
        };
    }, []);


    return (
        <div className="emptyPage">
            <div>
                <input type='text' className='inputName' value={page.title || ''} onChange={(e) => {
                    setPage(prev => ({ ...prev, title: e.target.value }))
                }} />
                <hr />
            </div>
            <div>
                <textarea className='cardBoxEmpty scrollableVertical' value={page.content?.text || ''} onChange={(e) => {
                    setPage(prev => ({
                        ...prev, content: {
                            ...prev.content,
                            text: e.target.value
                        }
                    }))
                }} type="text" name="" id="" />
            </div>

        </div>
    )
}