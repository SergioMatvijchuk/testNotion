import './Board.css';
import { useState, useEffect, useRef } from 'react';
import { ListComponent } from './listComponent/ListComponent';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { putChangesOfPage } from '../../../dataManager';

export function Board(state) {

    const [page, setPage] = useState({});
    const lastPageRef = useRef({});
    const updateLeftMenu = state.updateLeftMenu;
    const [lists, setLists] = useState([]);


    useEffect(() => {
        return async () => {
            console.log("Exit from Board component");
            await putChangesOfPage(lastPageRef.current);
            await updateLeftMenu();
        };
    }, []);
    useEffect(() => {
        console.log("Entry to  Empty component");
        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": pageProps.content,
            "slug": pageProps.slug,
        };
        console.log("initialPage ", initialPage);

        setPage(initialPage)
        lastPageRef.current = initialPage;

        const parsedLists = (pageProps.content?.internalContent || []).map((list, index) => ({
            id: `list_${index}`,
            title: list.title,
            cards: list.internalContent || []
        }));
        setLists(parsedLists);

    }, [state]);
    useEffect(() => {
        lastPageRef.current = page;
    }, [page]);


    // Добавление нового списка
    const addNewList = () => {
        setLists(prev => [
            ...prev,
            { id: 'list_' + prev.length, title: `List ${prev.length}`, cards: [] }
        ]);
    };

    // Обновление данных списка (например, изменение карточек)
    const updateList = (listId, newData) => {
        setLists(prev =>
            prev.map(list =>
                list.id === listId ? { ...list, ...newData } : list
            )
        );
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
                    <input type='text' className='inputName' value={page.title || ''} onChange={(e) => {
                        setPage(prev => ({
                            ...prev, title: e.target.value
                        }))
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