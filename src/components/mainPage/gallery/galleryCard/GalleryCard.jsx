import './GalleryCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../reducers/modalSlice'; //импортируем OpenModal
import { useState, useEffect, useRef } from 'react';

export function GalleryCard(state) {
    const [card, setCard] = useState({});
    const lastCardRef = useRef({});
    const dispatch = useDispatch(); // для отправки действия в редакс
    const modalData = useSelector((state) => state.modal.modalData); // получает данные модального окна
    const setCards = state.setCards;


    const pageProps = {
        id: state.card?.id,
        color: state.card.color,
        description: state.card.description,
        planedDate: state.card.planedDate,
        files: state.card.files,
        number: state.card.number,
        title: state.card.title,
    }
    // useEffect(() => {
    //     setCards(card);
    // }, [card]);



    useEffect(() => {
        console.log("STATE", state);
        const initialPage = {
            id: pageProps.id || `temp_` + crypto.randomUUID(),
            color: pageProps.color,
            description: pageProps.description,
            planedDate: pageProps.planedDate,
            files: pageProps.files || [],
            number: pageProps.number,
            title: pageProps.title,
        }
        setCard(initialPage);
        lastCardRef.current = initialPage;
    }, []);



    useEffect(() => {

        if (modalData && modalData.id === card.id) {
            console.log("modalData", modalData);
            const card = {
                id: modalData.id,
                color: modalData.color,
                description: modalData.description,
                planedDate: modalData.date,
                number: modalData.number,
                title: modalData.cardName,
                files: modalData.files,
            }
            setCard(card);
        }



    }, [modalData]);


    const handleCardClick = () => {
        dispatch(openModal({
            cardName: card.title, //вернуть в title
            id: card.id,
            date: card.planedDate,
            description: card.description,
            number: card.number,
            color: card.color,
            files: pageProps.files || [],
        }));


    }

    return (

        <>
            <div onClick={handleCardClick}>
                <img src={card.files?.[0]} alt="image" />
                <p>{card.title}</p>
            </div>
        </>
    )




}