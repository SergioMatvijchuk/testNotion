import './StartPage.css';
import { useState } from 'react';

export default function StartPage() {

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

                <div className='startBoxComp' >
                    <div>
                        <img src={staticImage.iconEmptyPage} alt="iconEmptyPage" />
                        <p>Empty page</p>
                    </div>
                    <div>
                        <p>Create a new Empty page for notes</p>
                    </div>

                </div>


                <div className='startBoxComp' >
                    <div> <img src={staticImage.iconBoard} alt="iconBoard" />
                        <p>Board</p>
                    </div>
                    <div>
                        <p>Organize your thoughts
                            on a visual Board</p>
                    </div>
                </div>
                <div className='startBoxComp' >
                    <div> <img src={staticImage.iconList} alt="iconList" />
                        <p>List</p>
                    </div>
                    <div>
                        <p>Make a List to structure
                            your tasks and ideas</p>
                    </div>
                </div>
                <div className='startBoxComp' >
                    <div> <img src={staticImage.iconGallery} alt="Plus" />
                        <p>Gallery</p>
                    </div>
                    <div>
                        <p>Save and view your images
                            and media files</p>
                    </div>
                </div>
                <div className='startBoxComp' >
                    <div> <img src={staticImage.iconTable} alt="Plus" />
                        <p>Table</p>
                    </div>
                    <div>
                        <p>Create a Table
                            for structured data</p>
                    </div>
                </div>

            </div>
        </div>
    )
}