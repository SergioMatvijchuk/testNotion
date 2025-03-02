import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, updateModalData, setModalText } from '../../reducers/modalSlice';
import './ModalWindow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function ModalWindow({ modalData }) {
    const dispatch = useDispatch();
    /* */
    const { text, id, imageUrl, description } = modalData;
    /** получаем жданные из модалки  ( modalState ) */
    const modalState = useSelector((state) => state.modal);

    /**  Состояние для отслеживания изменений в модальном окне */
    /**имя карточки + имя в модалке */
    const [inputText, setInputText] = useState(modalState.modalData?.text || '');
    /**картинка сеттер , должно работать на имнпуте файл */
    const [imageFile, setImageFile] = useState();
    /**пикер-календарь */
    const [showPicker, setShowPicker] = useState(false);
    const datepickerRef = useRef(null); //чтобы пикер закрывался при нажатии не на него
    const modalRef = useRef(null); // Ссылка на сам модальный контейнер
    const [selectedDate, setSelectedDate] = useState(null);




    // Закрытие календаря при клике вне него
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPicker]);

    // Закрытие модалки при клике вне её
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeAndReset(); // Закрыть и сбросить данные, если кликнули вне модалки
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // Функция для закрытия и сброса данных
    const closeAndReset = () => {
        dispatch(closeModal()); // Закрыть модалку
        setInputText(''); // Сбросить данные
        setImageFile(null); // Сбросить файл
        setSelectedDate(null); // Сбросить выбранную дату
    };



    /**Временные картинки */
    const path = 'img/mainPage/icons/'
    const staticImage = {
        iconEmptyPage: 'iconEmptyPage',
        iconList: 'iconList',
        iconBoard: 'iconBoard',
        iconTemplates: 'iconTemplates',
        iconTable: 'iconTable',
        iconGallery: 'iconGallery',
        iconCalendar: 'iconCalendar',
        iconClose: 'iconClose',
        iconFile: 'icon_files',
        iconPlus: 'iconPlus3'

    }
    Object.entries(staticImage).forEach(([key, value]) => {
        staticImage[key] = path + value + '.svg'
    });

    /** Изменение имени файла*/
    const handleChange = (data) => {
        setInputText(data);
        dispatch(setModalText(data));//обновляем текст в глобальном состоянии
    }

    const handleSave = () => {
        // Обновляем данные в Redux
        dispatch(updateModalData({ text: inputText, id: id }));
        dispatch(closeModal()); // Закрываем модалку
    };

    /**Реакция на кнопку */
    const close = () => {

        dispatch(closeModal()); // закрываем модалку
    }



    /**Появление автоскрола в textarea  */
    const onChanges = (e) => {

        e.target.style.height = 'auto';                           // сбрасываем высоту
        const newHeight = Math.min(e.target.scrollHeight, 300);   // scrollHeight — необходимая высота для контента, ограничиваем max-height (300px)
        e.target.style.height = newHeight + 'px';
        console.log(e.target.value);
    }

    /**Trigger for simulate input:file - click */
    const onDownloadFile = () => {
        document.getElementById('fileInput').click();
    }
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            alert("yes")
        }
    }
    const togglePicker = () => {
        setShowPicker(prev => !prev);  // Более явное обновление состояния
    };


    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-content">
                <input
                    type='text'
                    value={inputText}
                    onChange={(e) => handleChange(e.target.value)} // Обрабатываем изменения текста
                    placeholder="Card_name"
                /> <button onClick={close}><img src={staticImage.iconClose} alt="" /></button>
            </div>

            <div className='modal-content-main'>
                <div className='left-modal-content-main'>
                    <ul>
                        <li>
                            <div className='gallery_card_property' onClick={togglePicker} >
                                <p><img src={staticImage.iconCalendar} alt="date" />Date</p>
                                <p>{selectedDate ? selectedDate.toLocaleDateString() : "Выберите дату"}</p>

                            </div>
                        </li>
                        <li>
                            <div className='gallery_card_property' onClick={onDownloadFile}>
                                <p><img src={staticImage.iconFile} alt="file" />Files</p><p>Empty</p>
                            </div>
                        </li>
                        <li>
                            <div className='gallery_card_property'>
                                <p><img src={staticImage.iconPlus} alt="" /></p><p></p>
                            </div>
                        </li>

                    </ul>

                </div>
                <div className='right-modal-content-main'>
                    <textarea className='scrolable_up' onChange={onChanges} id="#describe_text" placeholder='Add a description...' defaultValue={null} />
                </div>
            </div>
            <hr className='separator' />
            <input type="file"
                name=""
                id='fileInput'
                style={{ display: 'none' }}
                onChange={onFileChange}
                accept='image/*'
            />

            {showPicker && (<div ref={datepickerRef} className='datePicker' >
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        setShowPicker(false);
                    }}

                    autoFocus
                />
            </div>
            )}
        </div>
    )
}



