import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/modalSlice'; //импортируем OpenModal
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { putChangesOfPage } from '../../../dataManager';
import './ListComponent.css';

export function ListComponent(state) {

    const { setComponent, updateLeftMenu } = state;
    const [cards, setCards] = useState([]);
    const [inputTitle, setInputTitle] = useState('');
    const [page, setPage] = useState({});
    const lastPageRef = useRef({});
    const lastCardsRef = useRef([]);
    const dispatch = useDispatch();
    const modalData = useSelector((state) => state.modal.modalData);
    const [id, setCardId] = useState('');

    const pageProps = {
        banner: state.data.banner,
        icon: state.data.icon,
        id: state.data.id,
        slug: state.data.slug,
        title: state.data.title,
        type: state.data.type,
        content: state.data.content
    }

    useEffect(() => {

        console.log("STATE", state);

        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": pageProps.content?.internalContent || [],
            "slug": pageProps.slug
        };
        setPage(initialPage);
        setCards(initialPage.content);
        setInputTitle(initialPage.title);


        lastPageRef.current = initialPage;



        return () => {
            const c = lastCardsRef.current;
            const p = lastPageRef.current;
            p.content = c
                .map(item => ({
                    ...item,
                    id: item.id?.includes("temp") ? null : item.id,
                    files: Array.isArray(item.files)
                        ? item.files.map(file => (file))
                        : []
                }));

    
            putChangesOfPage(p);
            updateLeftMenu();
        }
    }, []);

    useEffect(() => {
        setPage(prev => ({
            ...prev, title: inputTitle
        }));
    }, [inputTitle]);

    useEffect(() => {
        lastPageRef.current = page;
    }, [page])



    useEffect(() => {
        setPage(prev => ({
            ...prev, content: cards
        }))
        lastCardsRef.current = cards;
    }, [cards]);


    useEffect(() => {

        if (!modalData) return;
        let rawDate = new Date(modalData.date);
        const isValidDate = !isNaN(rawDate.getTime());
        const formattedDate = isValidDate
            ? rawDate.toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0];

        const card = {
            id: modalData.id,
            title: modalData.cardName || '',
            date: formattedDate,
            planedDate: formattedDate,
            description: modalData.description || '',
            number: modalData.number || '',
            color: modalData.color || '#3788d8',
        };
        if (modalData.files) {
            const arrFiles = new Array();
            arrFiles.push(modalData.files);
            card.files = arrFiles;
        }

        console.log("Card", card);
        const index = cards.findIndex(item => item.id === card.id);
        if (index !== -1) {
            const updatedCards = [...cards];
            updatedCards[index] = card;
            setCards(updatedCards);
        }
        else {
            setCards([...cards, card])
        }

    }, [modalData]);


    const moveCard = (dragId, hoverId) => {
        const updated = [...cards];
        const dragItem = updated.find(item => item.id === dragId);
        const hoverIndex = updated.findIndex(item => item.id === hoverId);
        const withoutDrag = updated.filter(item => item.id !== dragId);
        withoutDrag.splice(hoverIndex, 0, dragItem);
        const reordered = withoutDrag.map((item, index) => ({
            ...item,
            index,
        }));
        setCards(reordered);

    }

    const handleCardClick = (imageName, id, date, color, number, description) => {

        console.log(imageName, id, date, color, number, description);

        dispatch(openModal({
            cardName: imageName,
            id: id,
            date: date,
            description: description,
            number: number,
            color: color,
        }));
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
        setCards(cards.map(item =>
            item.id === id ? { ...item, title: newTitle } : item
        ));
    }

    const addnewElement = () => {
        setCards([...cards, {
            id: 'tempId_' + cards.length, title: "newList", position: cards.length + 1, date: new Date(), color: '', number: '', description: ''
        }])


    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="listComponent">
                <div>
                    <input type='text' className='inputName' value={inputTitle} onChange={(e) => {
                        setInputTitle(e.target.value);
                    }
                    } />
                    <hr />
                </div>
                <div className='scrollableVertical'>
                    <ul>
                        {
                            cards
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
    const [{ isDragging }, drag] = useDrag({
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
            className={`list-item ${isDragging ? 'dragging' : ''}`}>
            <span className="icon"
                onClick={(e) => {
                    setCardId(item.id);
                    console.log("ITEM|", item);

                    handleCardClick(item.title, item.id, item.date, item.color, item.number, item.description);
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