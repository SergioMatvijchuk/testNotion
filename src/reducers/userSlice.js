import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { getTokenFromUser, setUserToCookie } from "../utils/getUserFromCookies";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            setUserToCookie(action.payload);
            const token = getTokenFromUser();
            if (token) {

                console.log("Cookie OK , token : ", token);
            } else {
                console.log('Cookie Not ok!');

            }
            return action.payload;
        },
        logout: (state) => {
            Cookies.remove('user');
            return null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;