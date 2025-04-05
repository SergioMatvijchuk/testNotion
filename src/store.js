/** файл для хранилища store.js: */

import { configureStore } from '@reduxjs/toolkit';  // импортируем configureStore для создания хранилища
import modalSlice from './reducers/modalSlice'; // редьюсер для модалки
import  userReducer    from './reducers/userSlice';

const store = configureStore({
    reducer: {
        modal: modalSlice,
        /**modal: modalReducer: Это связывает
        редьюсер модалки с состоянием, доступным в state.modal.
         То есть, мы говорим Redux, что для состояния с именем modal
          нужно использовать редьюсер modalReducer. */
        user: userReducer,
    }
});
export default store;
