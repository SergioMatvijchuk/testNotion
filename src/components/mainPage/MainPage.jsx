import './MainPage.css';
import { MainMenu } from './leftmenu/MainMenu.jsx';
import { BannerUp } from './banner/BannerUp.jsx';
import { NewPage } from './newPage/NewPage.jsx';
import { useState, useEffect, useCallback } from 'react';
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
    const [pagesInLeftMenu, setPagesInLeftMenu] = useState(null);
    const setComponent = useCallback((component) => {
        setFading(true);
        setTimeout(() => {
            setChildComponent(component);
            setTimeout(() => {
                setFading(false);
            }, 300);
        }, 300);
    }, []);
    const [childComponent, setChildComponent] = useState(<StartPage setComponent={setComponent} />)



    return (
        <div className='mainPage '>
            <MainMenu setComponent={setComponent} setPagesInLeftMenu={setPagesInLeftMenu} pagesInLeftMenu={pagesInLeftMenu} />
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