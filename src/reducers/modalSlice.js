import { createSlice } from "@reduxjs/toolkit";


//slice for modal window

const modalSlice = createSlice({
    name: 'modal',  //Имя слайса. Оно будет использоваться для генерации имени редьюсера
    initialState: {
        isModalOpen: false,  //initialState: Начальное состояние слайса.
        modalData: null
    },
    reducers: { // Здесь мы описываем функции, которые изменяют состояние
        openModal(state, action) {
            state.isModalOpen = true;
            state.modalData = action.payload; // данные передаваемые при открытии

        },
        closeModal(state) {
            state.isModalOpen = false;
            state.modalData = null; //очизщаем данные при закрытии
        },
        updateModalData(state, action) {
            state.modalData = action.payload;  // обновление данных 
        },
        setModalCardName(state, action) {
            if (state.modalData) {
                state.modalData.cardName = action.payload;
            }
        },
        setModalDescription(state, action) {
            if (state.modalData) {
                state.modalData.description = action.payload;
            }
        },
        setModalNumber(state, action) {
            if (state.modalData) {
                state.modalData.number = action.payload;
            }
        },
        setModalColor(state, action) {
            if (state.modalData) {
                state.modalData.color = action.payload
            }
        },
        setModalDate(state, action) {
            if (state.modalData) {
                state.modalData.date = action.payload
            }
        },
        setModalFile(state, action) {
            if (state.modalData) {
                state.modalData.files = action.payload
            }
        }
    },
});

//Экспрт actions и редьюсер
export const { openModal, closeModal, setModalFile, updateModalData, setModalCardName, setModalDescription, setModalNumber, setModalColor, setModalDate } = modalSlice.actions;
export default modalSlice.reducer;