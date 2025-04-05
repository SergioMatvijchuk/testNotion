import './MainPage.css';
import { MainMenu } from './leftmenu/MainMenu.jsx';
import { BannerUp } from './banner/BannerUp.jsx';
import { NewPage } from './newPage/NewPage.jsx';
import { useState, useEffect } from 'react';
import { Gallery } from './gallery/Gallery.jsx';
import { EmptyPage } from './emptyPage/EmptyPage.jsx';
import StartPage from './startPAge/StartPage.jsx';
import { ListComponent } from './listComponent/ListComponent.jsx';
import { TableComponent } from './tableComponent/TableComponent.jsx';
import { Calendar } from './calendar/Calendar.jsx';
import { useSelector } from 'react-redux';
import { getTokenFromUser } from '../../utils/getUserFromCookies.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userSlice.js';
import { useNavigate } from 'react-router-dom';

export function MainPage() {
    const [fading, setFading] = useState(false);
    const user = useSelector((state) => state.user);
    const [pagesData, setPagesData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setComponent = (component) => {
        setFading(true); // Начало анимации затухания
        setTimeout(() => {
            setChildComponent(component); // Замена компонента после анимации затухания
            setTimeout(() => {
                setFading(false); // Конец анимации затухания и начало анимации появления
            }, 300); // Дополнительная задержка для появления нового компонента
        }, 300); // Задержка на 300 мс
    };
    const [childComponent, setChildComponent] = useState(<StartPage setComponent={setComponent} />)


    useEffect(() => {

        const pagesDatas = async () => {

            try {
                const token = getTokenFromUser();
                const requestData = {
                    token: token,
                }
                const response = await fetch('http://20.107.224.34/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                    credentials: 'include',
                });


                if (!response.ok) {
                    throw new Error(`Response not OK: ${response.status}`);
                }

                const data = await response.json();
             
                setPagesData(data.pages);



            } catch (error) {
                console.error(`Error ` + error);
            }

        }
        pagesDatas();
    }, []);



    return (
        <div className='mainPage '>
            <MainMenu setComponent={setComponent} data={pagesData} />
            <div className='contentWrapper'>
                <div className='bannerUp'>
                    <BannerUp />
                </div>
                <div className={`mainContent ${fading ? 'fade-out' : 'fade-in'}`}>
                    {childComponent}
                </div>
            </div>
        </div>
    )
}