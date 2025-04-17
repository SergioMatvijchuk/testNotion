import { useState } from 'react';
import './CraftIdees.css'
import { NavLink } from 'react-router-dom';


export function CraftIdees() {
    const [activeTab, setActiveTab] = useState('Board');
    const objState = {
        image_board: 'img/landing/Board.png',
        image_list: 'img/landing/List.png',
        image_calendar: 'img/landing/Calendar.png',
        image_table: 'img/landing/Table.png',
        image_empty_page: 'img/landing/Empty_page.png',
    }
    const [imageUrl, setImageUrl] = useState(objState.image_board);
    const handleClick = (tab) => () => {
        switch (tab) {
            case 'Board': setImageUrl(objState.image_board); break;
            case 'List': setImageUrl(objState.image_list); break;
            case 'Calendar': setImageUrl(objState.image_calendar); break;
            case 'Table': setImageUrl(objState.image_table); break;
            case 'Empty_page': setImageUrl(objState.image_empty_page); break;
        }
        setActiveTab(tab);
    }

    return (
        <div className='craft_container'>
            <div>
                <p>
                    Craft your <span style={{
                        textDecoration: 'underline',
                        textDecorationColor: '#434BF3',
                        textUnderlineOffset: '10px'
                    }}>ideas</span> in your style
                </p>
            </div>
            <div>
                <a className={activeTab === 'Board' ? 'active fade-in' : ''} onClick={handleClick("Board")}>Board</a>
                <a className={activeTab === 'List' ? 'active fade-in' : ''} onClick={handleClick("List")}>List</a>
                <a className={activeTab === 'Calendar' ? 'active fade-in' : ''} onClick={handleClick("Calendar")}>Calendar</a>
                <a className={activeTab === 'Table' ? 'active fade-in' : ''} onClick={handleClick("Table")}> Table</a>
                <a className={activeTab === 'Empty_page' ? 'active fade-in' : ''} onClick={handleClick("Empty_page")}>Empty page</a>
            </div>
            <div className='container_image'>
                <img src={imageUrl} key={imageUrl} className='fade-in' alt="" />
            </div>
        </div>
    )
}