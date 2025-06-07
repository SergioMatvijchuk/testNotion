import './Calendar.css';
import { useState, useEffect, useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../reducers/modalSlice';
import { putChangesOfPage } from '../../../dataManager';

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


export function Calendar(state) {

    const { setComponent, updateLeftMenu } = state;
    const [cards, setCards] = useState([]); // карточки , которые загружаются из БД массивом - content.internalContent []
    const [events, setEvents] = useState([]);  //ивенты которые идут в календарь
    const [inputTitle, setInputTitle] = useState(''); // название календаря
    const [page, setPage] = useState({}); //body  , которое будем потом отправлять.
    const lastPageRef = useRef({});   //здесь храним ссылку на самые последние данные по page
    const lastCardsRef = useRef([]); //здесь храним ссылку на самые последние данные по cards

    const dispatch = useDispatch();//для отправки действий в редакс
    const modalData = useSelector((state) => state.modal.modalData);  //тащим данные из модалки


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

        const eventsToCalendar = initialPage.content.map(card => ({
            id: card.id,
            title: card.title,
            start: card.planedDate,
            allDay: true,
            backgroundColor: card.color || "#3788d8",
            description: card.description,
            calendarId: card.calendarId,
            files: card.files,
            number: card.number,
        }));
        setEvents(eventsToCalendar);


        return () => {
            const c = lastCardsRef.current;
            const p = lastPageRef.current;
            p.content = c
                .filter(item => item.date || item.planedDate)
                .map(item => ({
                    ...item,
                    id: item.id?.includes("temp_") ? null : item.id,
                    files: Array.isArray(item.files)
                        ? item.files.map(file => ({ uploadedFile: file }))
                        : []
                }));


            console.log("P", p);
            console.log("state", state);

            putChangesOfPage(p);
            updateLeftMenu();
            console.log("Exit from Componjent");
        }
    }, [])

    useEffect(() => {
        setPage(prev => ({
            ...prev, title: inputTitle
        }));
    }, [inputTitle]);

    useEffect(() => {
        lastPageRef.current = page;
    }, [page]);
    // Функция для генерации событий "+ New" на каждый день месяца
    useEffect(() => {
        const eventsToCalendar = cards.map(card => ({
            id: card.id,
            title: card.title,
            start: card.planedDate,
            allDay: true,
            backgroundColor: card.color || "#3788d8",
            description: card.description,
            calendarId: card.calendarId,
            files: card.files,
            number: card.number,
        }));
        setEvents(eventsToCalendar);
        lastCardsRef.current = cards;
    }, [cards]);

    //вызов модалки
    const handleCardClick = (imageName, id, date, color, number, description) => {
        dispatch(openModal({
            cardName: imageName, //вернуть в title
            id: id,
            date: date,
            description: description,
            number: number,
            color: color,


        }));
    }

    const handleAddNote = ({ date, id }) => {
        const shortDate = new Date(date).toISOString().split('T')[0];
        handleCardClick(`Day ${shortDate}`, id, date);
    }




    useEffect(() => {
        if (!modalData) return;
        console.log("modal Object", modalData);

        const card = {
            id: modalData.id,
            title: modalData.cardName || '',
            date: new Date(modalData.date).toISOString().split('T')[0],
            planedDate: new Date(modalData.date).toISOString().split('T')[0],
            description: modalData.description || '',
            number: modalData.number || '',
            files: modalData.files || [],
            color: modalData.color || '#3788d8',
        }

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



    return (
        <div className='calendarComponent'>
            <div>
                <input type='text' className='inputName' value={inputTitle} onChange={(e) => {
                    setInputTitle(e.target.value);
                }
                } />

                <FullCalendar
                    className='calender'
                    timeZone='UTC'
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    events={events}
                    editable={true}
                    height="540px"
                    eventDrop={(info) => {
                        console.log("EVENT DROP ", info);

                        const updatedEvent = info.event;
                        const newDate = updatedEvent.start;
                        const cardId = updatedEvent.id;
                        setEvents((prevEvents) =>
                            prevEvents.map((event) =>
                                event.id === cardId ? { ...event, start: newDate } : event
                            )
                        );

                        setCards((prevCards) =>
                            prevCards.map((card) =>
                                card.id === cardId ? { ...card, planedDate: newDate.toISOString() } : card)
                        );
                    }}

                    eventClick={(info) => {
                        console.log("EVENT CLICK ", info);
                        const { description, calendarId, files } = info.event.extendedProps;
                        dispatch(openModal({
                            cardName: info.event.title,
                            id: info.event.id,
                            date: info.event.start.toISOString(),
                            description: description || '',
                            number: info.event.extendedProps.number || info.event.number || '',
                            color: info.event.extendedProps.color || info.event.backgroundColor || '#3788d8',
                            files: files || [],
                        }));


                    }}
                    dayCellContent={(arg) => {
                        return (
                            <div className="dayBox" id={`day-${arg.date.getTime()}`}>
                                <img className="btnAddCalender"
                                    onClick={() => handleAddNote({
                                        date: arg.date.toISOString(),
                                        id: "temp_" + crypto.randomUUID()
                                    })}
                                    src={staticImage.iconPlus}
                                />
                                <span>{arg.dayNumberText}</span> {/* Число дня */}
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )


}