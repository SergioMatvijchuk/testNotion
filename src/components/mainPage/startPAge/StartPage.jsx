import { Board } from '../board/Board';
import { EmptyPage } from '../emptyPage/EmptyPage';
import { Gallery } from '../gallery/Gallery';
import { ListComponent } from '../listComponent/ListComponent';
import { TableComponent } from '../tableComponent/TableComponent';
import { Calendar } from '../calendar/Calendar';
import './StartPage.css';
import { useState, useEffect } from 'react';
import { createNewPage, getAllPages } from '../../../dataManager';


export default function StartPage(state) {

    const [name, setName] = useState('Untitled');
    const setComponent = state.setComponent;
    const updateLeftMenu = state.updateLeftMenu;
    const setPagesInLeftMenu = state.setPagesInLeftMenu;
    useEffect(() => {
        console.log("State StartPage", state);


    }, []);

    const path = 'img/mainPage/icons/';
    const staticImage = {
        iconEmptyPage: 'iconEmptyPage',
        iconList: 'iconList',
        iconBoard: 'iconBoard',
        iconTemplates: 'iconTemplates',
        iconTable: 'iconTable',
        iconGallery: 'iconGallery',
        iconCalendar: 'iconCalendar',
        iconClose: 'iconClose',
    }
    const staticBanner = 'img/mainPage/bannerUp/default_banner_1.svg';
    Object.entries(staticImage).forEach(([key, value]) => {
        staticImage[key] = path + value + '.svg'
    });

    const typePage = {
        Empty: 'Empty',
        Board: 'Board',
        List: 'List',
        Calendar: 'Calendar',
        Table: 'Table',
    };

    const typePages = {
        Board: (data) => <Board data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Empty: (data) => <EmptyPage data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Calendar: (data) => <Calendar data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        List: (data) => <ListComponent data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Gallery: (data) => <Gallery data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Table: (data) => <TableComponent data={data} setComponent={setComponent} updateLeftMenu={updateLeftMenu} />,
        Default: (data) => <div>Unknown page type: {data?.type}</div>
    }


    const handleCreateNewPage = async (type, iconUrl) => {
        const page = await createNewPage(name, type, staticBanner, iconUrl);

        const response = await getAllPages(); //получаем все страницы 
        await setPagesInLeftMenu(response.data);  //обновляем левое меню
        //render new Component

        const Component = typePages[type];
        setComponent(Component(page.data));
    }



    return (
        <div className='startBox'>

            <div>
                <input type='text' className='inputName' value={name} onChange={(e) => {
                    setName(e.target.value);
                }
                } />

                <hr />
            </div>

            <div className="startBoxComponents">

                <div className='startBoxComp'>
                    <div onClick={(e) => handleCreateNewPage(typePage.Empty, staticImage.iconEmptyPage)}>
                        <div>
                            <img src={staticImage.iconEmptyPage} alt="" />
                            <p>Empty Page</p>
                        </div>
                    </div>

                    <div>
                        <p>Create a new Empty page for notes</p>
                    </div>
                </div>


                <div className='startBoxComp'>
                    <div onClick={(e) => handleCreateNewPage(typePage.Board, staticImage.iconBoard)}>
                        <div>
                            <img src={staticImage.iconEmptyPage} alt="" />
                            <p>Board</p>
                        </div>
                    </div>
                    <div>
                        <p> Organize your thoughts on a visual Board</p>
                    </div>
                </div>

                <div className='startBoxComp'>
                    <div onClick={
                        (e) => handleCreateNewPage(typePage.List, staticImage.iconList)}>
                        <div><img src={staticImage.iconList} alt="" />
                            <p>List</p>
                        </div>
                    </div>
                    <div>
                        <p>Make a List to structure your tasks and idea</p>
                    </div>
                </div>
                <div className='startBoxComp'>
                    <div onClick={(e) => handleCreateNewPage(typePage.Calendar, staticImage.iconCalendar)}>
                        <div>
                            <img src={staticImage.iconEmptyPage} alt="" />
                            <p>Calendar</p>

                        </div>
                    </div>
                    <div>
                        <p>Create a Calendar for structured data</p>
                    </div>
                </div>
                <div className='startBoxComp'>
                    <div onClick={(e) => handleCreateNewPage(typePage.Table, staticImage.iconTable)}>
                        <div>   <img src={staticImage.iconEmptyPage} alt="" />
                            <p>Table</p>
                        </div>
                    </div>
                    <div>
                        <p>Save and view your data in a Table</p>
                    </div>
                </div>






            </div>
        </div>
    )
}