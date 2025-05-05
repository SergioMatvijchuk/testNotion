import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../reducers/userSlice";


function LoginSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ress, setress] = useState();

    useEffect(() => {
        res();
    }, [])
    const res = async () => {
        const params = new URLSearchParams(location.search);
        const email = params.get("email");



        const response = await fetch(`https://localhost:7114/imgriff/auth/user-by-email?email=${email}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });


        const data = await response.json();

        dispatch(setUser(data.user));
        console.log('авторизация норм, куки впорядке.Навигируем.');
        navigate('/');


        setress(response);
    }








    // if (email) {

    //     console.log(email);

    //     navigate("/");
    // } else {
    //     console.error("email не найден");
    //     navigate("/login");
    // }


    return <div>Логинимся...</div>;
}

export default LoginSuccess;