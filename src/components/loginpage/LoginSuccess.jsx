import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../reducers/userSlice";
import { AuthByEmail, continueWithGoogle } from "../../dataManager";
import { setUserToCookie } from "../../utils/getUserFromCookies";

function LoginSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ress, setress] = useState();

    useEffect(() => {
        res();
    }, [])

    const res = async () => {
        const params = new URLSearchParams(location.search); //
        const email = params.get("email");


        const data = await AuthByEmail(email);
        if (data) {
            dispatch(setUser(data.data));
          return navigate('/');
        }
        else console.log("No navigate");


    }
   
    return <div>Логинимся...</div>;
}

export default LoginSuccess;