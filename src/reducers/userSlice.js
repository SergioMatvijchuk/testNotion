import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { getTokenFromUser, setUserToCookie, setTokenToCookie } from "../utils/getUserFromCookies";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            setUserToCookie(action.payload.user);
            setTokenToCookie(action.payload.jwt);

            return action.payload;
        },
        logout: (state) => {
            Cookies.remove('token', { path: '/' });
            Cookies.remove('user', { path: '/' });
            return null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;