import './MainPage.css';
import { MainMenu } from './leftmenu/MainMenu.jsx';
import { BannerUp } from './banner/BannerUp.jsx';
import { Board } from './board/Board.jsx';


export function MainPage() {
    return (
        <div className='mainPage'>
            <MainMenu />
            <div>
                <div className='bannerUp'>
                    <BannerUp />
                </div>
                <div className='mainContent'>
                    <Board />
                </div>
            </div>



        </div>
    )
}