import './NewPage.css';
import { useState } from 'react';
import { Board } from '../board/Board';
import { Gallery } from '../gallery/Gallery';
import { Calendar } from '../calendar/Calendar';
import { ListComponent } from '../listComponent/ListComponent';
import { TableComponent } from '../tableComponent/TableComponent';
import { EmptyPage } from '../emptyPage/EmptyPage';
import { TemplatesComponent } from '../templates/TemplatesComponent'
import StartPage from '../startPAge/StartPage';
import { createNewPage, getAllPages } from '../../../dataManager';

export function NewPage(state) {
  const [name, setName] = useState('Untitled');
  const setComponent = state.setComponent;
  const setPagesInLeftMenu = state.setPagesInLeftMenu;
  const updateLeftMenu = state.updateLeftMenu;

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
    Gallery: 'Gallery',

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

  const closeNewPage = () => {
    setComponent(<StartPage setComponent={setComponent} />);
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
    <div className='newPageComponent'>
      <div>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <img src={staticImage.iconClose} onClick={closeNewPage} alt="" />
      </div>
      <div>
        <ul>
          <li>
            <div onClick={
              (e) => handleCreateNewPage(typePage.Empty, staticImage.iconEmptyPage)}>
              <img src={staticImage.iconEmptyPage} alt="" />
              Empty Page
            </div>
          </li>
          <li>
            <div onClick={
              (e) => handleCreateNewPage(typePage.Table, staticImage.iconTable)}>
              <img src={staticImage.iconTable} alt="" />
              Table
            </div>
          </li>
          <li>
            <div onClick={
              (e) => handleCreateNewPage(typePage.List, staticImage.iconList)}>
              <img src={staticImage.iconList} alt="" />
              List
            </div>
          </li>
          <li>
            <div onClick={
              (e) => handleCreateNewPage(typePage.Gallery, staticImage.iconGallery)}>
              <img src={staticImage.iconGallery} alt="" />
              Gallery
            </div>
          </li>
          <li>
            <div onClick={
              (e) => handleCreateNewPage(typePage.Board, staticImage.iconBoard)}>
              <img src={staticImage.iconBoard} alt="" />
              Board
            </div>
          </li>
          <li>
            <div onClick={
              (e) => handleCreateNewPage(typePage.Calendar, staticImage.iconCalendar)}>
              <img src={staticImage.iconCalendar} alt="" />Calendar
            </div>
          </li>
          <li>
            <div onClick={
              (e) => setComponent(<TemplatesComponent setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconTemplates} alt="" />Templates</div>
          </li>

        </ul>
      </div>

    </div>
  );

}