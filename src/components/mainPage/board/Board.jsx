import './Board.css';
import { useState, useEffect, useRef } from 'react';
import { ListComponent } from './listComponent/ListComponent';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { putChangesOfPage } from '../../../dataManager';


export function Board(state) {
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
    // Состояние с массивом списков. Каждый список имеет id, заголовок и массив карточек.
    const [lists, setLists] = useState(() => {
        const rawLists = pageProps.content?.internalContent || [];

        const transformed = rawLists.map(list => ({
            id: list.id,
            title: list.title || '',
            cards: list.internalContent || []
        }));

        return [...transformed, { id: 'tempId_0', title: '', cards: [] }];
    });
    const [page, setPage] = useState({});
    const lastPageRef = useRef({});
    const updateLeftMenu = state.updateLeftMenu; //при выходе обновляем левое меню 

    const [inputNameBoard, setInputNameBoard] = useState(pageProps.title);

    useEffect(() => {
        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": {
                "title": pageProps.title,
                "internalContent": lists.map(list => list.cards)
            },
            "slug": pageProps.slug
        };
        setPage(initialPage);


        lastPageRef.current = initialPage;
    }, [state]);

    useEffect(() => {
        lastPageRef.current = page;
    }, [page])

    useEffect(() => {
        setPage(prev => ({ ...prev, content: lists }));



    }, [lists]); // Будет вызываться каждый раз, когда `lists` изменяется
    useEffect(() => {
        setPage(prev => ({ ...prev, title: inputNameBoard }));
    }, [inputNameBoard]);


    useEffect(() => {

        console.log("Lists", lists);
        return async () => {
            console.log("lastPageRef.current", lastPageRef.current);

            lastPageRef.current.content = lastPageRef.current.content.map(list => {

                const updatedList = {
                    ...list,
                    id: list.id?.includes('temp') ? null : list.id,
                    internalContent: list.cards.map(card => {
                        return {
                            ...card,
                            id: card.id?.includes('temp') ? null : card.id
                        }
                    })
                }
                delete updatedList.cards;
                return updatedList;
            });

            lastPageRef.current.content?.length && lastPageRef.current.content.pop();


            await putChangesOfPage(lastPageRef.current);
            await updateLeftMenu();
        };
    }, []);


    const addNewList = (title, id) => {
        const listArr = lists.map(el => el.id === id ? { ...el, title: title } : el
        );

        setLists([
            ...listArr,
            { id: 'temp_' + listArr.length, title: '', cards: [] }
        ]);
        setPage(prev => ({ ...prev, content: lists }));

    };



    // Обновление данных списка (например, изменение карточек)
    const updateList = (listId, newData) => {
        setLists(prev =>
            prev.map(list =>
                list.id === listId ? { ...list, ...newData } : list
            )
        );
        setPage(prev => ({ ...prev, content: lists }));
    };



    // Перемещение карточки между списками:
    // Удаляем карточку из списка-источника и добавляем в список-соседа.
    // В Board.js
    const moveCardBetweenLists = (card, sourceListId, destListId, dropIndex) => {
        setLists(prev =>
            prev.map(list => {
                if (list.id === sourceListId) {
                    return { ...list, cards: list.cards.filter(c => c.id !== card.id) };
                } else if (list.id === destListId) {
                    const newCards = [...list.cards];
                    newCards.splice(dropIndex, 0, card);
                    return { ...list, cards: newCards };
                } else {
                    return list;
                }
            })
        );
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board">
                <div>
                    <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                        setInputNameBoard(e.target.value);
                    }
                    } />

                    <hr />
                </div>


                <div id="boxForListComponent" className="borderBoxForList scrollable">
                    {lists.map(list => (
                        <ListComponent
                            key={list.id}
                            listId={list.id}
                            cards={list.cards}
                            title={list.title}
                            updateList={updateList}
                            moveCardBetweenLists={moveCardBetweenLists}
                            addNewList={addNewList}
                        />
                    ))}

                </div>
            </div>
        </DndProvider>
    );
}