import './Calendar.css';
import { useState, useEffect, useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/modalSlice';
import { putChangesOfPage } from '../../../dataManager';


export function Calendar(state) {
    const { cardName } = state;
    const [events, setEvents] = useState([])
    const [cards, setCards] = useState([]);
    const [inputNameBoard, setInputNameBoard] = useState(cardName || '');
    const [page, setPage] = useState({});
    const lastPageRef = useRef({});
    const lastCardsRef = useRef([]);
    const updateLeftMenu = state.updateLeftMenu;
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


    useEffect(() => {
        console.log("state", state);

        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": pageProps.content?.internalContent || [],
            "slug": pageProps.slug
        };

        setPage(initialPage)
        setCards(initialPage.content);
        setInputNameBoard(initialPage.title);

        console.log("Initialpage", initialPage);

        lastPageRef.current = initialPage;
        const evs = initialPage.content.map(card => {
            const startDate = new Date(card.date ?? card.plannedDate);
            // Обнуляем время для all-day события
            startDate.setHours(0, 0, 0, 0);

            return {
                id: card.id,
                title: card.cardName,
                start: new Date(card.date ?? card.plannedDate),
                allDay: true,
                backgroundColor: card.color || "#3788d8",
                extendedProps: card
            }
        });
        setEvents(evs);
    }, []);

    useEffect(() => {
        setPage(prev => ({
            ...prev,
            title: inputNameBoard
        }));
    }, [inputNameBoard]);

    useEffect(() => {
        lastPageRef.current = page;
    }, [page]);

    useEffect(() => {
        return () => {
            const c = lastCardsRef.current;
            const p = lastPageRef.current;
            console.log("{PPPP}", p);

            console.log("cards", c);

            p.content = c
                .filter(item => item.date || item.planedDate)
                .map(item => ({
                    ...item,
                    id: item.id?.includes("temp_") ? null : item.id
                })).map(c => {
                    const date = new Date(c.date || c.planedDate);
                    date.setHours(0, 0, 0, 0);
                    return {
                        title: c.cardName || c.title,
                        description: c.description || '',
                        color: c.color || '',
                        number: c.number || '',
                        planedDate: date.toISOString(), // "2025-05-20T00:00:00.000Z"
                        files: c.files || []
                    };
                });
            console.log("P", p);
            console.log("state", state);

            putChangesOfPage(p);
            updateLeftMenu();
        };
    }, []);



    //для отправки действий в редакс
    const dispatch = useDispatch();

    //тащим данные из модалки
    const modalData = useSelector((state) => state.modal.modalData);

    //useEffect на модалку , чтоб все красиво изменялось
    useEffect(() => {
        if (modalData) {
            console.log(modalData);
            const normalizedCard = {
                id: modalData.id,
                cardName: modalData.cardName || modalData.title || '',
                date: modalData.date,
                description: modalData.description || '',
                color: modalData.color || '#3788d8',
                number: modalData.number || '',
                files: modalData.files || []
            }

            let existingIndex = cards.findIndex(c => c.id === normalizedCard.id);
            let updatedCards;

            if (existingIndex !== -1) {
                // Обновляем
                updatedCards = [...cards];
                updatedCards[existingIndex] = normalizedCard;
            } else {
                // Добавляем
                updatedCards = [...cards, normalizedCard];
            }

            const uniqueById = updatedCards.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id
                ))
            );

            setCards(uniqueById);
            console.log("UpdatedCards", updatedCards);



            const storedEvents = updatedCards.map(card => {
                const startDate = new Date(card.date || card.plannedDate);
                return {
                    id: card.id,
                    title: card.cardName || 'No Name',
                    start: startDate,
                    allDay: true,
                    backgroundColor: card.сolor || "#3788d8",
                    extendedProps: {
                        id: card.id,
                        calendarId: state.data?.id,
                        title: card.cardName,
                        description: card.description,
                        color: card.color,
                        number: card.number,
                        files: card.files,
                        date: card.date
                    }
                }
            }
            )

            console.log("StoredEvents", storedEvents);
            setEvents(storedEvents);
        }
    }, [modalData]);
    // Функция для генерации событий "+ New" на каждый день месяца
    useEffect(() => {
        const evs = cards.map(card => ({
            id: card.id,
            title: card.title || card.cardName,
            start: new Date(card.planedDate ?? card.date),
            backgroundColor: card.color || '#3788d8',
            allDay: true,
            extendedProps: card
        }));
        setEvents(evs);
        lastCardsRef.current = cards;
    }, [cards]);


    const handleCardClick = (imageName, id, date, color, number, description) => {
        dispatch(openModal({
            cardName: imageName,
            id: id,
            date: date,
            description: description,
            number: number,
            color: color
        }));
    }

    const handleAddNote = ({ date, id }) => {
        handleCardClick("imageName", id, date);
    }

    return (
        <div className="calendarComponent">
            <div>
                <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                    setInputNameBoard(e.target.value);
                }
                } />
                <FullCalendar
                    className="calender"
                    timeZone="UTC"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true} // включаем перетаскивание событий
                    eventDrop={(info) => {
                        const updatedEvent = info.event; // Получаем событие с новой датой
                        const newDate = updatedEvent.start;
                        const cardId = updatedEvent.extendedProps.id; // Используем id карточки
                        // Обновляем события в state
                        setEvents((prevEvents) =>
                            prevEvents.map((event) =>
                                event.id === updatedEvent.id ?
                                    {
                                        ...event, start: newDate,
                                        extendedProps: { ...event.extendedProps, date: newDate }
                                    } : event
                            ),
                        );

                        const storedCards = cards || {};
                        if (storedCards[cardId]) {
                            storedCards[cardId] = {
                                ...storedCards[cardId],
                                date: newDate.toISOString() // Обновляем дату
                            };
                        }
                    }}

                    eventClick={(info) => {
                        const { id, number, description, title, color, files, date } = info.event.extendedProps;
                        console.log("INFO", info);

                        dispatch(openModal({
                            cardName: title,
                            id: id,
                            date: date,
                            description: description,
                            number: number,
                            color: color,
                            files: files,
                        }))
                    }}
                    height="540px" // Растягивает календарь на весь экран
                    dayCellContent={(arg) => {
                        return (
                            <div className="dayBox" id={`day-${arg.date.getTime()}`}>
                                <img
                                    className="btnAddCalender"
                                    onClick={() => handleAddNote({
                                        date: arg.date.toISOString(),
                                        id: "temp_" + crypto.randomUUID()
                                    })}
                                    src={staticImage.iconPlus}
                                />
                                <span>{arg.dayNumberText}</span> {/* Число дня */}

                            </div>
                        );
                    }}
                />

            </div>
        </div>
    )
}
