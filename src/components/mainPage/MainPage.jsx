import './MainPage.css';
import { MainMenu } from './leftmenu/MainMenu.jsx';
import { BannerUp } from './banner/BannerUp.jsx';
import { NewPage } from './newPage/NewPage.jsx';
import { useState } from 'react';
import { Gallery } from './gallery/Gallery.jsx';
import { EmptyPage } from './emptyPage/EmptyPage.jsx';
import StartPage from './startPAge/StartPage.jsx';
import { ListComponent } from './listComponent/ListComponent.jsx';

export function MainPage() {

    const [fading, setFading] = useState(false);

    const setComponent = (component) => {
        setFading(true); // Начало анимации затухания
        setTimeout(() => {
            setChildComponent(component); // Замена компонента после анимации затухания
            setTimeout(() => {
                setFading(false); // Конец анимации затухания и начало анимации появления
            }, 300); // Дополнительная задержка для появления нового компонента
        }, 300); // Задержка на 300 мс
    };
    const [childComponent, setChildComponent] = useState(<ListComponent setComponent={setComponent} />)
    return (
        <div className='mainPage '>
            <MainMenu setComponent={setComponent} />
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