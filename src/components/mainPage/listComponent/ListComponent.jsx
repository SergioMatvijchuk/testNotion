import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/modalSlice'; //импортируем OpenModal
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './ListComponent.css';

export function ListComponent() {
    const [inputNameBoard, setInputNameBoard] = useState('List');
    const [collectionList, setCollectionList] = useState([
        { id: 'card_list_0', context: 'newList', position: 1 },
        { id: 'card_list_1', context: 'newList', position: 2 }]);
    const [id, setCardId] = useState('');
    const dispatch = useDispatch();
    const modalData = useSelector((state) => state.modal.modalData);

    useEffect(() => {
        if (modalData && modalData.text && modalData.id == id) {
            changeCardName(modalData.text, id);
        }
    }, [modalData]);
    useEffect(() => {
        console.log(collectionList); // Это будет выводить актуальное состояние после рендера
    }, [collectionList]);

    const moveCard = (draggeId, hoverId) => {
        const updatedlist = [...collectionList];
        const draggedIndex = updatedlist.findIndex(item => item.id === draggeId);
        const hoverIndex = updatedlist.findIndex(item => item.id === hoverId);
        if (draggedIndex !== -1 && hoverIndex !== -1) {
            [updatedlist[hoverIndex].position, updatedlist[draggedIndex].position] =
                [updatedlist[draggedIndex].position, updatedlist[hoverIndex].position];// обмен позиций между елементами
        }
        setCollectionList(updatedlist);
        console.log(collectionList);

    }

    const handleCardClick = (context, id) => {
        dispatch(openModal({ text: context, id: id })); //передаем данные в модалку
    }

    const handleInputChange = (e, id) => {
        const newValue = e.target.value;
        if (newValue && newValue !== undefined) {
            changeCardName(newValue, id);
        }
    }

    const pathImg = 'img/mainPage/';
    let staticImages = {
        iconPencleChange: 'icons/iconPencleChange.svg',
    }

    for (let value in staticImages) {
        staticImages[value] = pathImg + staticImages[value];
    }



    const changeCardName = (newContext, id) => {
        const newCollectionList = collectionList.map(item => item.id === id ? {
            ...item, context: newContext
        } : item);
        setCollectionList(newCollectionList);


    }
    const addnewElement = () => {
        setCollectionList([...collectionList, {
            id: 'card_list_' + collectionList.length, context: "newList", position: collectionList.length + 1
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
                                .sort((a, b) => a.position - b.position)
                                .map(item => (
                                    <DraggableItem key={item.id} item={item} moveCard={moveCard} setCardId={setCardId} handleCardClick={handleCardClick} handleInputChange={handleInputChange} />
                                ))
                        }


                        <li className='liAddNew' onClick={addnewElement}>New</li>
                    </ul>
                </div>
            </div>
        </DndProvider>
    )
}


function DraggableItem({ item, moveCard, setCardId, handleCardClick, handleInputChange }) {
    const [{ isDragging }, drag, prewiew] = useDrag({
        type: 'CARD',
        item: { id: item.id, position: item.position },
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
                    handleCardClick(item.context, item.id);
                }} />
            <input type="text" value={item.context} onChange={(e) => {
                handleInputChange(e, item.id)
            }} />
        </li>
    )
}