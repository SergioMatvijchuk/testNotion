import { Board } from '../board/Board';
import { EmptyPage } from '../emptyPage/EmptyPage';
import { Gallery } from '../gallery/Gallery';
import { ListComponent } from '../listComponent/ListComponent';
import { TableComponent } from '../tableComponent/TableComponent';
import './StartPage.css';
import { useState } from 'react';

export default function StartPage({ setComponent }) {

    const [inputNameBoard, setInputNameBoard] = useState('Untitled');


    const staticImage = {
        imageSimple: 'img/mainPage/gallery/1729314189.jpg',
        iconPlus: 'img/mainPage/icons/iconPlus3.svg',
        iconClose: 'img/mainPage/icons/iconClose.svg',
        iconEmptyPage: 'img/mainPage/icons/iconEmptyPage.svg',
        iconBoard: 'img/mainPage/icons/iconBoard.svg',
        iconList: 'img/mainPage/icons/iconList.svg',
        iconGallery: 'img/mainPage/icons/iconGallery.svg',
        iconTable: 'img/mainPage/icons/iconTable.svg',
    }

    const linksComponent = {
        emptyPage: {
            'name': "Empty page",
            'img': staticImage.iconEmptyPage,
            'description': 'Create a new Empty page for notes',
            'linkElement': <EmptyPage setComponent={setComponent} cardName={inputNameBoard} />
        },
        board: {
            'name': "Board",
            'img': staticImage.iconBoard,
            'description': 'Organize your thoughts on a visual Board',
            'linkElement': <Board setComponent={setComponent} cardName={inputNameBoard} />
        },
        list: {
            'name': "List",
            'img': staticImage.iconList,
            'description': 'Make a List to structure your tasks and ideas',
            'linkElement': <ListComponent setComponent={setComponent} cardName={inputNameBoard} />
        },
        gallery: {
            'name': "Gallery",
            'img': staticImage.iconBoard,
            'description': 'Save and view your images and media files',
            'linkElement': <Gallery setComponent={setComponent} cardName={inputNameBoard} />
        },
        table: {
            'name': "Table",
            'img': staticImage.iconTable,
            'description': 'Create a Table for structured data',
            'linkElement': <TableComponent setComponent={setComponent} cardName={inputNameBoard} />
        }
    }

    return (
        <div className='startBox'>

            <div>
                <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
                    setInputNameBoard(e.target.value);
                }
                } />

                <hr />
            </div>

            <div className="startBoxComponents">

                {Object.entries(linksComponent).map(([key, item]) => (
                    <div className='startBoxComp' key={key} onClick={() => setComponent(item.linkElement)}>
                        <div>
                            <img src={item.img} alt="key" />
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}