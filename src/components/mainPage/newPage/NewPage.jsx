import './NewPage.css';
import { useState } from 'react';
import { Board } from '../board/Board';
import { Gallery } from '../gallery/Gallery';
import { Calendar } from '../calendar/Calendar';
import { ListComponent } from '../listComponent/ListComponent';
import { TableComponent } from '../tableComponent/TableComponent';
import { EmptyPage } from '../emptyPage/EmptyPage';
import { TemplatesComponent } from '../templates/TemplatesComponent'
import { useNavigate } from 'react-router-dom';
import StartPage from '../startPAge/StartPage';


export function NewPage({ setComponent }) {
  const [name, setName] = useState('Untitled');
  const [type, setType] = useState();
  const navigate = useNavigate();
  
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
  Object.entries(staticImage).forEach(([key, value]) => {
    staticImage[key] = path + value + '.svg'
  });
  const closeNewPage = () => {
    setComponent(<StartPage setComponent={setComponent} />);
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
            <div onClick={(e) => setComponent(<EmptyPage setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconEmptyPage} alt="" />Empty Page</div>
          </li>
          <li>
            <div onClick={(e) => setComponent(<TableComponent setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconTable} alt="" />Table</div>
          </li>
          <li>
            <div onClick={(e) => setComponent(<ListComponent setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconList} alt="" />List</div>
          </li>
          <li>
            <div onClick={(e) => setComponent(<Gallery setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconGallery} alt="" />Gallery</div>
          </li>
          <li>
            <div onClick={(e) => setComponent(<Board setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconBoard} alt="" />Board</div>
          </li>
          <li>
            <div onClick={(e) => setComponent(<Calendar setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconCalendar} alt="" />Calendar</div>
          </li>
          <li>
            <div onClick={(e) => setComponent(<TemplatesComponent setComponent={setComponent} cardName={name} />)}><img src={staticImage.iconTemplates} alt="" />Templates</div>
          </li>

        </ul>
      </div>

    </div>
  );

}