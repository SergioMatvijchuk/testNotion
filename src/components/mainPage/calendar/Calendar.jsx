import './Calendar.css';
import { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function Calendar() {
    const [inputNameBoard, setInputNameBoard] = useState('Calendar');
    const [events, setEvents] = useState([])



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

        setEvents(newEvents);
    }, []);

    const handleAddNote = (date) => {
        console.log(date);

        const selectedDate = new Date(date); // Дата, на которую нажали
        const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

        alert(`Добавить заметку на ${dayOfWeek}, ${selectedDate.toDateString()}`);
    }
    return (
        <div className="calendarComponent">
            <div>
                <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                    setInputNameBoard(e.target.value);
                }
                } />
              

                <FullCalendar
                    className='calender'
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="540px" // Растягивает календарь на весь экран,
                    dayCellContent={(arg) => (
                        <div className='dayBox'>
                            <img className='btnAddCalender'
                            onClick={() => handleAddNote(arg.date.toDateString())}
                            src={staticImage.iconPlus}
                        />
                            <span>{arg.dayNumberText}</span> {/* Число дня */}

                        </div>
                    )}
                />
            </div>
        </div>
    )
}


