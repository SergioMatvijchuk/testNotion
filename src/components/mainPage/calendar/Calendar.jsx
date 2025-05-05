import './Calendar.css';
import { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/modalSlice';

export function Calendar({ cardName, data }) {
    const [inputNameBoard, setInputNameBoard] = useState(cardName);

    const [events, setEvents] = useState([])
    //общая коллекция карточек
    const [cards, setCards] = useState([]);
    useEffect(() => {
        if (data) {
            setCards(data.content?.internalContent);
        };
    }, [data])

    //для отправки действий в редакс
    const dispatch = useDispatch();

    //тащим данные из модалки
    const modalData = useSelector((state) => state.modal.modalData);

    //useEffect на модалку , чтоб все красиво изменялось
    useEffect(() => {
        if (modalData) {
            const storedCards = cards || {};
            storedCards[modalData.id] = { ...modalData };
            localStorage.setItem('card', JSON.stringify(storedCards));  //Здесь нужно путом закинуть карточку


            const updatedEvents = Object.values(storedCards).map(card => ({
                title: card.cardName,
                start: new Date(card.date),
                backgroundColor: card.color || "#3788d8",
                allDay: true,
                extendedProps: { ...card }
            }));
            setEvents(updatedEvents);
        }

    }, [modalData]);


    const handleCardClick = (imageName, id, date, color, number, description) => {
        console.log("handleCardClick " + JSON.stringify(date));
        dispatch(openModal({
            cardName: imageName,
            id: id,
            date: date,
            description: description,
            number: number,
            color: color
        }));
    }



    const path = 'img/mainPage/icons/'
    const staticImage = {
        iconPlus: 'iconPlus4',
        iconList: 'iconList',
        iconBoard: 'iconBoard',
        iconTemplates: 'iconTemplates',
        iconTable: 'iconTable',
        iconGallery: 'iconGallery',
        iconCalendar: 'iconCalendar',
        iconClose: 'iconClose',

    }
    Object.entries(staticImage).forEach(([key, value]) => {
        staticImage[key] = path + value + '.svg'
    });



    // Функция для генерации событий "+ New" на каждый день месяца
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // Текущий месяц (0 - январь)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Количество дней в месяце
        const newEvents = [];
        for (let day = 1; day <= daysInMonth; day++) {
            newEvents.push({
                title: "+ New",
                start: new Date(year, month, day), // Дата для каждого дня
                allDay: true,
            });
        }
        /**получаем карточки из Пропсов дата */
        const storedCards = cards || {};



        const storedEvents = Object.values(storedCards).map(card => ({
            title: card.cardName,
            start: new Date(card.date),
            backgroundColor: card.color || "#3788d8",
            allDay: true,
            extendedProps: { // доп данные
                id: card.id,
                number: card.number,
                description: card.description,
                color: card.color,
                cardName: card.cardName,
                files: card.files,
                date: card.date
            }
        }))
        setEvents([...storedEvents]);
        setCards(storedCards);

    }, []);

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
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true} // включаем перетаскивание событий
                    eventDrop={(info) => {
                        console.log("INFO!!!" + JSON.stringify(info));

                        const updatedEvent = info.event; // Получаем событие с новой датой
                        const newDate = updatedEvent.start;
                        const cardId = updatedEvent.extendedProps.id; // Используем id карточки

                        // Обновляем события в state
                        setEvents((prevEvents) =>
                            prevEvents.map((event) =>
                                event.id === updatedEvent.id ? { ...event, start: newDate, extendedProps: { ...event.extendedProps, date: newDate } } : event
                            ),
                        );

                        // Обновляем карточки в localStorage
                        const storedCards = cards || {};
                        if (storedCards[cardId]) {
                            storedCards[cardId] = {
                                ...storedCards[cardId],
                                date: newDate.toISOString() // Обновляем дату
                            };
                            localStorage.setItem('card', JSON.stringify(storedCards)); // Сохраняем обновленные карточки
                        }
                    }}

                    eventClick={(info) => {
                        const { id, number, description, cardName, color, files, date } = info.event.extendedProps;
                        dispatch(openModal({
                            cardName: cardName,
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
                                    onClick={() => handleAddNote({ date: arg.date.toISOString(), id: crypto.randomUUID() })}
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


