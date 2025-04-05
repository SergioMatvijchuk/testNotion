import { useEffect, useState } from "react"
import './Login.css';
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../reducers/userSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export function Login(props) {

    /**прокинуть пропсами ссылки на картинки  */
    const [state, setState] = useState(props);
    const [email, setEmail] = useState();
    const [token, setToken] = useState();
    const [loginCode, setLoginCode] = useState();
    const user = useSelector((state) => state.user);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailChange = (e) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(e.target.value)) {
            setEmail(e.target.value);
        }
        else {
            setEmail(null);
        }
    }
    /**create normal pass */
    const codeChange = (e) => {
        setLoginCode(e.target.value)
    }

    const handleAuthorisation = async () => {
        if (!email || !loginCode)
            return;

        const requestData = {
            email: email,
            code: loginCode,
        };

        try {
            const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
                credentials: 'include',
            });


            if (!response.ok) {
                throw new Error('response not OK');
            }

            const data = await response.json();
            console.log(data);
            if (data.status === 'success') {
                dispatch(setUser(data.user));
                console.log('авторизация норм, куки впорядке.Навигируем.');
                navigate('/');
            }
        } catch (error) {
            console.error(`Error ` + error);
        }
    }

    const continueWirhGoole = () => {

        //     navigate("https://localhost:7114/imgriff/auth/login");  // Redirect to backend
    }


    const objState = {
        obj_state_fon: 'img/loginpage/Login_main.png',
        google_icon: 'img/loginpage/google_icon.svg',

    }

    return (<div className="containerLogin" >
        <div><img src={objState.obj_state_fon} alt="" /></div>
        <div>
            <div className="RegistrationBox">
                <div>
                    <p>Log in</p>
                    <a href="" onClick={continueWirhGoole}><img src={objState.google_icon} alt=""
                    />Continue with Google</a>
                    <hr />
                </div>
                <div>
                    <p>Email</p>
                    <input type="text" placeholder="Enter your email" onChange={emailChange} />
                    <a href="">Check your inbox</a>
                </div>
                <div>
                    <p>Login code</p>
                    <input type="text" placeholder="Enter your login code" onChange={codeChange} />
                    <button onClick={handleAuthorisation}>Continue with login code</button>
                    <a href="">Didn't receive the code?</a>
                </div>

            </div>
        </div>
    </div >


    )

}



