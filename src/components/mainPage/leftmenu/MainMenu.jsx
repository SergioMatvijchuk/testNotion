import { NavLink } from 'react-router-dom';
import './MainMenu.css';
import { Board } from '../board/Board.jsx'; // Импортируй Board
import { NewPage } from '../newPage/NewPage.jsx'; // Импортируй NewPage
import { getTokenFromUser } from '../../../utils/getUserFromCookies.js';
import { useEffect, useState } from 'react';

export function MainMenu({ setComponent, data }) {

    const pathImg = 'img/mainPage/';
    let staticImages = {
        iconImgriff: 'icons/iconImgriff.svg',
        iconSearch: 'icons/iconSearch.svg',
        iconPlus: 'icons/iconPlus.svg',
        iconTemplates: 'icons/iconTemplates.svg',
        iconTrasch: 'icons/iconTrash.svg',
        iconSettings: 'icons/iconSettings.svg',
        iconImport: 'icons/iconImport.svg'

    }

    for (let value in staticImages) {
        staticImages[value] = pathImg + staticImages[value];
    }


    const [pages, setPages] = useState(null);
    useEffect(() => {
        console.log("datas", data);
        if (data) setPages(data);
    }, [data, pages]);


    return (
        <div className='mainMenu'>
            <aside >
                <div className='sideBarFirstBlock'>
                    <img src={staticImages.iconImgriff} alt="imgriff_icon" />
                    <div>
                        <ul>
                            <li><img src={staticImages.iconSearch} />Search</li>
                            <li><a onClick={() => setComponent(<NewPage setComponent={setComponent} />)}><img src={staticImages.iconPlus} />New Page</a></li>
                            <li><a onClick={() => setComponent(<Board setComponent={setComponent} />)}><img src={staticImages.iconTemplates} />Templates</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='sideBarSecondBlock'>
                    <div>
                        <ul>
                            {pages ? (
                                pages.map((page) => (

                                    <li key={page.id}>
                                        <a><img src={staticImages.iconPlus} />{page.title}</a>
                                    </li>  // Пример использования данных
                                ))
                            ) : (
                                <li>Нет страниц</li>
                            )}
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='sideBarThirdBlock'>
                    <div>
                        <ul>
                            <li><img src={staticImages.iconImport} />Import</li>
                            <li><img src={staticImages.iconSettings} />Settings</li>
                            <li><img src={staticImages.iconTrasch} />Trash</li>
                        </ul>
                    </div>
                </div>
            </aside >
        </div >
    )
}



