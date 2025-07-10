import { useEffect, useState } from "react"
import './Login.css';
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../reducers/userSlice";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { continueWithGoogle, sendEmail, sendEmailAndCode } from "../../dataManager";
import Cookies from 'js-cookie'


export function Login(props) {

``    const [email, setEmail] = useState();
    const [loginCode, setLoginCode] = useState();
    const user = useSelector((state) => state.user);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        cleanCookie();
    }, []);
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

    const cleanCookie = () => {
        Object.keys(Cookies.get()).forEach(cookieName => {
            Cookies.remove(cookieName, { path: '/' });
        });

    }
    const handleAuthorisation = async () => {


        if (!email || !loginCode)
            return;

        try {

            const data = await sendEmailAndCode(email, loginCode);
            if (data.status.code < 200 || data.status.code >= 300) {
                throw new Error('response not OK');
            }

            dispatch(setUser(data.data));
            navigate('/');

        } catch (error) {
            console.error(`Error ` + error);
        }
    }


    const handleSendEmail = async () => {
        const mail = email;
        if (!email)
            return;
        const data = await sendEmail(mail)
    }




    const handleContinueWithGoogle = async () => {
        await continueWithGoogle();

    }


    const objState = {
        obj_state_fon: 'img/loginpage/Login_main.png',
        google_icon: 'img/loginpage/google_icon.svg',
        link_left: 'img/loginpage/left_link.svg'

    }

    return (<div className="containerLogin" >
        <div><img src={objState.obj_state_fon} alt="haha" /></div>
        <div>
            <div className="RegistrationBox">
                <div>
                    <p>Log in</p>
                    <a onClick={handleContinueWithGoogle}><img src={objState.google_icon} alt=""
                    />Continue with Google</a>
                    <hr />
                </div>
                <div>
                    <p>Email</p>
                    <input type="text" placeholder="Enter your email" onChange={emailChange} />
                    <button onClick={handleSendEmail}>Check your inbox</button>
                </div>
                <div>
                    <p>Login code</p>
                    <input type="text" placeholder="Enter your login code" onChange={codeChange} />
                    <button onClick={handleAuthorisation}>Continue with login code</button>
                    <a href="">Didn't receive the code?</a>
                </div>
                <div className="linktoLanding"><img src={objState.link_left} alt="" /></div>
            </div>

        </div>
    </div >


    )

}



