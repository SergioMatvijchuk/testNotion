import './MainMenu.css';
import { Board } from '../board/Board.jsx'; // Импортируй Board
import { NewPage } from '../newPage/NewPage.jsx'; // Импортируй NewPage
import { useEffect, useState } from 'react';
import React from 'react';
import { getAllPages, getPageBySlug } from '../../../dataManager.js';
import { EmptyPage } from '../emptyPage/EmptyPage.jsx';
import { Calendar } from '../calendar/Calendar.jsx';
import { ListComponent } from '../listComponent/ListComponent.jsx';
import { Gallery } from '../gallery/Gallery.jsx';
import { TableComponent } from '../tableComponent/TableComponent.jsx';
import { useDevice } from '../../../deviceProvider.js';
import { bubble as Menu } from 'react-burger-menu';


export function MainMenu(state) {
    const setComponent = state.setComponent;
    const pagesInLeftMenu = state.pagesInLeftMenu;
    const setPagesInLeftMenu = state.setPagesInLeftMenu;
    const updateLeftMenu = state.updateLeftMenu;
    const { isMobile, isDesktop } = useDevice();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        console.log("ISOPEN???????????", isOpen);
        setIsOpen(false);
    }

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

    const typePages = {
        Board: (data) => <Board data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Empty: (data) => <EmptyPage data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Calendar: (data) => <Calendar data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        List: (data) => <ListComponent data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Gallery: (data) => <Gallery data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Table: (data) => <TableComponent data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Default: (data) => <div>Unknown page type: {data?.type}</div>
    }

    const handleGetPageBySlug = async (slug) => {
        try {
            const response = await getPageBySlug(slug);
            const pageType = response?.data?.type || 'Default';
            const Component = typePages[pageType];
            const element = Component(response.data, response.data.slug);
            setComponent(React.cloneElement(element, { key: response.data.slug }));

        } catch (error) {
            console.log("Error fetching data:", error);
        }

    }

    const handleSetnewPageComponent = async () => {
        toggleMenu();
        setComponent(<NewPage setComponent={setComponent} setPagesInLeftMenu={setPagesInLeftMenu} updateLeftMenu={updateLeftMenu} />);


    }

    return (<>
        {isMobile && (

            <Menu
                left
                isOpen={isOpen}
                onStateChange={({ isOpen }) => setIsOpen(isOpen)}
            >
                <div className='menuContainer'>
                    <div className='menuContainerPart1'>
                        <img src={staticImages.iconImgriff} alt="imgriff_icon" />
                        <ul>
                            <li onClick={toggleMenu}><img src={staticImages.iconSearch} alt="search" />Search...<hr /></li>
                            <li onClick={handleSetnewPageComponent}><img src={staticImages.iconPlus} alt="plus" />New Page</li>
                        </ul>
                    </div>
                    <div className='menuContainerPart2'> <ul>
                        {pagesInLeftMenu?.length ? (
                            pagesInLeftMenu.map((page) => (
                                <li key={page.id} onClick={() => {
                                    handleGetPageBySlug(page.slug);
                                    toggleMenu();
                                }}>
                                    <img src={staticImages.iconPlus} alt="page" />{page.title}
                                </li>
                            ))

                        ) : (
                            <li>Нет страниц</li>
                        )}


                    </ul></div>
                    <div className='menuContainerPart3'>  <ul>
                        <li><img src={staticImages.iconSettings} alt="settings" />Settings</li>
                        <li><img src={staticImages.iconTrasch} alt="trash" />Trash</li>
                    </ul></div>

                </div>


            </Menu>
        )}


        {isDesktop && (
            <div className='mainMenu'>
                <aside >
                    <div className='sideBarFirstBlock'>
                        <img src={staticImages.iconImgriff} alt="imgriff_icon" />
                        <div>
                            <ul>
                                <li><img src={staticImages.iconSearch} />Search</li>
                                <li><a onClick={handleSetnewPageComponent}><img src={staticImages.iconPlus} />New Page</a></li>
                                <li><a onClick={() => alert("Templates")}><img src={staticImages.iconTemplates} />Templates</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className='sideBarSecondBlock'>
                        <div>
                            <ul>
                                {pagesInLeftMenu ? (
                                    pagesInLeftMenu.map((page) => (

                                        <li key={page.id} title={page.title}>
                                            <a onClick={() => handleGetPageBySlug(page.slug)} >
                                                <img src={staticImages.iconPlus} />
                                                {page.title.length > 15 ? page.title.slice(0, 15) + '…' : page.title}

                                            </a>
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
                                <li></li>
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
    </>
    );
}



