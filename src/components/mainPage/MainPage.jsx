import './MainPage.css';
import { MainMenu } from './leftmenu/MainMenu_mob.jsx';
import { BannerUp } from './banner/BannerUp.jsx';
import { useState, useEffect, useCallback } from 'react';
import StartPage from './startPAge/StartPage.jsx';
import { useSelector } from 'react-redux';
import { getAllPages } from '../../dataManager.js';
import { useDevice } from '../../deviceProvider.js';


export function MainPage() {
    const [fading, setFading] = useState(false);
    const user = useSelector((state) => state.user);
    const [pagesInLeftMenu, setPagesInLeftMenu] = useState(null);
    const { isMobile, isDesktop } = useDevice();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const setComponent = useCallback((component) => {
        setFading(true);
        setTimeout(() => {
            setChildComponent(component);
            setTimeout(() => {
                setFading(false);
            }, 300);
        }, 300);
    }, []);

    const updateLeftMenu = async () => {
        try {
            console.log("updateLeftMenu");
            const response = await getAllPages(); //получаем все страницы 
            setPagesInLeftMenu(response.data);
         

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };
    useEffect(() => {
        updateLeftMenu();
    }, []);
    const [childComponent, setChildComponent] = useState(<StartPage setComponent={setComponent} updateLeftMenu={updateLeftMenu} setPagesInLeftMenu={setPagesInLeftMenu} />)

    return (
        <div className='mainPage '>
            <MainMenu setComponent={setComponent} updateLeftMenu={updateLeftMenu} setPagesInLeftMenu={setPagesInLeftMenu} pagesInLeftMenu={pagesInLeftMenu} />
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