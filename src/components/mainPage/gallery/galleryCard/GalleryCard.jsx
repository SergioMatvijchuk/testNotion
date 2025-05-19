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
        date: state.card.date,
        url: state.card.url,
        number: state.card.number,
        title: state.card.title,
    }

    useEffect(() => {
        setCards(prevCards => prevCards.map(c => c.id === card.id ? card : c));
    }, [card]);



    useEffect(() => {
        console.log("STATE Card", state);
        const initialPage = {
            id: pageProps.id || `temp_` + crypto.randomUUID(),
            color: pageProps.color,
            description: pageProps.description,
            date: pageProps.date,
            url: pageProps.url,
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
                date: modalData.date,
                number: modalData.number,
                title: modalData.cardName,
                url: modalData.files,
            }
            setCard(card);
        }

    }, [modalData]);


    const handleCardClick = () => {
        dispatch(openModal({
            cardName: card.title, //вернуть в title
            id: card.id,
            date: card.date,
            description: card.description,
            number: card.number,
            color: card.color,
            files: card.url,
        }));

    }

    return (

        <>
            <div onClick={handleCardClick}>
                <img src={card.url} alt="image" />
                <p>{card.title}</p>
            </div>
        </>
    )




}