import { NavLink } from 'react-router-dom';
import './MainMenu.css';
import { Board } from '../board/Board.jsx'; // Импортируй Board
import { NewPage } from '../newPage/NewPage.jsx'; // Импортируй NewPage
import { getTokenFromUser } from '../../../utils/getUserFromCookies.js';
import { useEffect, useState } from 'react';
import { getAllPages, getPageBySlug } from '../../../dataManager.js';
import { EmptyPage } from '../emptyPage/EmptyPage.jsx';
import { Calendar } from '../calendar/Calendar.jsx';
import { ListComponent } from '../listComponent/ListComponent.jsx';
import { Gallery } from '../gallery/Gallery.jsx';
import { TableComponent } from '../tableComponent/TableComponent.jsx';

export function MainMenu({ setComponent }) {

    /**работа с иконкаим */
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
    /**конец работы с иконками */

    /**обновление страничек */

    const [pages, setPages] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPages(); //получаем все страницы 
                console.log(response.data);
                
                setPages(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const typePages = {
        Board: (data) => <Board data={data} setComponent={setComponent} />,
        Empty: (data) => <EmptyPage data={data} setComponent={setComponent} />,
        Calendar: (data) => <Calendar data={data} setComponent={setComponent} />,
        List: (data) => <ListComponent data={data} setComponent={setComponent} />,
        Gallery: (data) => <Gallery data={data} setComponent={setComponent} />,
        Table: (data) => <TableComponent data={data} setComponent={setComponent} />,
        Default: (data) => <div>Unknown page type: {data?.type}</div>
    }

    const handleGetPageBySlug = (slug) => {
        const fetchData = async () => {
            try {
                const response = await getPageBySlug(slug);
                const pageType = response?.data?.type || 'Default';
                const Component = typePages[pageType];
                setComponent(Component(response.data));

            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }




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

                                    <li key={page.id} onClick={() => setComponent()} >
                                        <a onClick={() => handleGetPageBySlug(page.slug)}><img src={staticImages.iconPlus} />{page.title}</a>
                                    </li>
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



