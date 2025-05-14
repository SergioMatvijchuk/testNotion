import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/modalSlice'; //импортируем OpenModal
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { putChangesOfPage } from '../../../dataManager';
import './ListComponent.css';

export function ListComponent(state) {

    const cardName = state.cardName;

    const [inputNameBoard, setInputNameBoard] = useState(cardName || '');
    const [collectionList, setCollectionList] = useState([]);
    const [page, setPage] = useState({});


    const pageProps = {
        setComponent: state.data.setComponent,
        updateLeftMenu: () => state.updateLeftMenu(),
        banner: state.data.banner,
        icon: state.data.icon,
        id: state.data.id,
        slug: state.data.slug,
        title: state.data.title,
        type: state.data.type,
        content: state.data.content
    };
    const lastPageRef = useRef({});

    useEffect(() => {
        lastPageRef.current = page;
    }, [page])


    const modalData = useSelector((state) => state.modal.modalData);


    useEffect(() => {
        console.log("State", state);
        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": {
                "title": pageProps.title,
                "internalContent": pageProps.content?.internalContent || [],
            },
            "slug": pageProps.slug
        };
        setPage(initialPage);
        setCollectionList(initialPage.content.internalContent);
        setInputNameBoard(initialPage.title);
        lastPageRef.current = initialPage;
        return async () => {
            console.log("page!~", lastPageRef);
            lastPageRef.current.content = lastPageRef.current.content.map(list => ({
                ...list,
                id: list.id?.includes('tempId_') ? null : list.id,
            }));
            // const updatedPage = {
            //     ...lastPageRef.current,
            //     title: inputNameBoard,
            //     content:
            //         lastPageRef.current.content?.internalContent?.map(list => ({
            //             ...list,
            //             id: list.id?.includes('tempId_') ? null : list.id,
            //         })) || [],
            // }


            console.log("lastPageRef.current", lastPageRef.current);

            await putChangesOfPage(lastPageRef.current);

            await pageProps.updateLeftMenu();

        };
    }, []);
    useEffect(() => {
        setPage(prev => ({
            ...prev, title: inputNameBoard
        }))
    }, [inputNameBoard])

    const updateLeftMenu = () => state.updateLeftMenu;
    useEffect(() => {
        console.log("update collectionList", lastPageRef.current);

        setPage(prev => ({
            ...prev, content: collectionList

        }))
        console.log("PAge", page);


    }, [collectionList]);





    const [id, setCardId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalData && modalData.text && modalData.id == id) {
            changeCardName(modalData.text, id);
        }
    }, [modalData]);

    const moveCard = (dragId, hoverId) => {
        const updated = [...collectionList];
        const dragItem = updated.find(item => item.id === dragId);
        const hoverIndex = updated.findIndex(item => item.id === hoverId);
        const withoutDrag = updated.filter(item => item.id !== dragId);
        withoutDrag.splice(hoverIndex, 0, dragItem);
        const reordered = withoutDrag.map((item, index) => ({
            ...item,
            index,
        }));
        setCollectionList(reordered);

    }

    const handleCardClick = (title, id) => {
        dispatch(openModal({ text: title, id: id })); //передаем данные в модалку
    }

    const handleInputChange = (e, id) => {
        const newValue = e.target.value;
        changeCardName(newValue, id);
    }

    const pathImg = 'img/mainPage/';
    let staticImages = {
        iconPencleChange: 'icons/iconPencleChange.svg',
    }

    for (let value in staticImages) {
        staticImages[value] = pathImg + staticImages[value];
    }

    const changeCardName = (newTitle, id) => {
        setCollectionList(collectionList.map(item =>
            item.id === id ? { ...item, title: newTitle } : item
        ));
    }

    const addnewElement = () => {
        setCollectionList([...collectionList, {
            id: 'tempId_' + collectionList.length, title: "newList", position: collectionList.length + 1
        }])
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="listComponent">
                <div>
                    <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                        setInputNameBoard(e.target.value);
                    }
                    } />
                    <hr />
                </div>
                <div className='scrollableVertical'>
                    <ul>
                        {
                            collectionList
                                .sort((a, b) => a.index - b.index)
                                .map(item => (
                                    <DraggableItem
                                        key={item.id}
                                        item={item}
                                        moveCard={moveCard}
                                        changeCardName={changeCardName}
                                        setCardId={setCardId}
                                        handleCardClick={handleCardClick}
                                        handleInputChange={handleInputChange}

                                    />
                                ))
                        }


                        <li className='liAddNew' onClick={addnewElement}>New</li>
                    </ul>
                </div>
            </div>
        </DndProvider>
    )
}


function DraggableItem({ item, moveCard, setCardId, handleCardClick, handleInputChange, changeCardName }) {
    const [{ isDragging }, drag, prewiew] = useDrag({
        type: 'CARD',
        item: { id: item.id, index: item.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            item: monitor.getItem(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'CARD',
        hover: (draggedItem) => {
            if (draggedItem.id !== item.id) {
                moveCard(draggedItem.id, item.id);
            }
        }
    });

    return (
        <li ref={(node) => drag(drop(node))}
            className={`list-item ${isDragging ? 'dragging' : ''}`}

        >
            <span className="icon"
                onClick={(e) => {
                    setCardId(item.id);
                    handleCardClick(item.title, item.id);
                }} />
            <input type="text"
                value={item.title}
                onChange={(e) => { handleInputChange(e, item.id) }}
                onBlur={() => {
                    if (!item.title.trim()) {
                        changeCardName('newList', item.id);
                    }
                }}
            />
        </li>
    )
}