import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    closeModal,
    setModalCardName,
    setModalDescription,
    setModalNumber,
    setModalColor,
    setModalDate
} from '../../reducers/modalSlice';
import './ModalWindow.css';
import DatePicker from "react-datepicker";
import ColorPicker from './ColorPicker';
import "react-datepicker/dist/react-datepicker.css";



export default function ModalWindow() {
    const dispatch = useDispatch();
    /** получаем данные из модалки  ( modalState ) */
    const modalState = useSelector((state) => state.modal);
    const { id, cardName, imageFile, number, date, color, description } = modalState.modalData || {};
    const [formData, setFormData] = useState({
        cardName: cardName || '',
        description: description || '',
        imageFile: imageFile || '',
        number: number || '',
        date: new Date(date) || '',
        color: color || '',
    });


    /**пикер-календарь */
    const [showPicker, setShowPicker] = useState(false);
    const datepickerRef = useRef(null); //чтобы пикер закрывался при нажатии не на него
    const pickerRef = useRef(null); // ссылка на цветпикер
    const modalRef = useRef(null); // Ссылка на сам модальный контейнер

    /**picker-color */
    const [showColorPicker, setShowColorPicker] = useState(false);
    const toggleColorPicker = () => {
        setShowColorPicker(prev => !prev);
    }

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
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowColorPicker(false); // Скрыть пикер при клике вне его
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // Функция для закрытия и сброса данных
    const closeAndReset = () => {
        dispatch(closeModal());
        setFormData({
            cardName: null,
            imageFile: null,
            number: null,
            date: null,
            description: null,
            color: null,

        });
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
        iconPlus: 'iconPlus3',
        iconColor: 'iconColor',
        iconPhone: 'iconPhone'

    }
    Object.entries(staticImage).forEach(([key, value]) => {
        staticImage[key] = path + value + '.svg'
    });



    /**Реакция на кнопку */
    const close = () => {
        dispatch(closeModal()); // закрываем модалку
        setFormData({
            cardName: null,
            imageFile: null,
            number: null,
            date: null,
            description: null,
            color: null,
        });


    }



    /**Появление автоскрола в textarea  */
    const onChanges = (e) => {
        e.target.style.height = 'auto';                           // сбрасываем высоту
        const newHeight = Math.min(e.target.scrollHeight, 300);   // scrollHeight — необходимая высота для контента, ограничиваем max-height (300px)
        e.target.style.height = newHeight + 'px';
        setModalDescription(prevState => ({
            ...prevState, cardName: e.target.value,
        }));
        console.log(formData);

        dispatch(setModalDescription(e.target.value));
    }


    /** Изменение имени файла*/
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState, cardName: e.target.value,
        }));
        dispatch(setModalCardName(e.target.value));//обновляем текст в глобальном состоянии
    }


    /**Trigger for simulate input:file - click */
    const onDownloadFile = (e) => {
        document.getElementById('fileInput').click();

    }
    const onChangeNumber = (e) => {
        setFormData(prevState => ({
            ...prevState, number: e.target.value,
        }));
        dispatch(setModalNumber(e.target.value));
        console.log("Modal , number", e.target.value);


        setShowPicker(false);
    }


    const onChangeColor = (color) => {
        setFormData(prevState => ({
            ...prevState, color: color.hex,
        }));
        dispatch(setModalColor(color.hex));

    }
    const onDateChange = (e) => {
        setFormData(prevState => ({
            ...prevState, date: e,
        }));
        dispatch(setModalDate(e.toLocaleDateString()));
        setShowPicker(false);
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
                    value={formData.cardName}
                    onChange={handleChange} // Обрабатываем изменения текста
                    placeholder="Card_name"
                /> <button onClick={close}><img src={staticImage.iconClose} alt="" /></button>
            </div>

            <div className='modal-content-main'>
                <div className='left-modal-content-main'>
                    <ul>
                        <li>
                            <div className='gallery_card_property' >
                                <p onClick={togglePicker}><img src={staticImage.iconCalendar} alt="date" />Date</p>
                                <p>{formData.date.toLocaleDateString() ? formData.date.toLocaleDateString() : "Выберите дату"}</p>

                            </div>
                        </li>
                        <li>
                            <div className='gallery_card_property'>
                                <p onClick={onDownloadFile}><img src={staticImage.iconFile} alt="file" />Files</p><p>Empty</p>
                            </div>
                        </li>
                        <li>
                            <div className='gallery_card_property'>
                                <p><img src={staticImage.iconPhone}
                                    alt="number" />Number
                                </p>
                                <p>
                                    <input type="number" value={formData.number} onChange={onChangeNumber} />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='gallery_card_property' ref={pickerRef}>
                                <p onClick={toggleColorPicker}><img src={staticImage.iconColor} alt="color" />Color</p>
                                {(showColorPicker && <ColorPicker handleColorChange={onChangeColor} />) || <p>{formData.color || "empty"}</p>}
                            </div>
                        </li>

                    </ul>

                </div>
                <div className='right-modal-content-main'>
                    <textarea className='scrolable_up' onChange={onChanges} id="#describe_text" placeholder='Add a description...' defaultValue={description || ''} />
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
                    selected={formData.date}
                    onChange={onDateChange}
                    autoFocus
                />
            </div>
            )}
        </div>
    )
}



