import './Gallery.css';
import { useRef, useState, useEffect } from 'react';
import { GalleryCard } from './galleryCard/GalleryCard';
import { updateModalData } from '../../../reducers/modalSlice';
import { putChangesOfPage } from '../../../dataManager';


const staticImage = {
  imageSimple: 'img/mainPage/gallery/1729314189.jpg',
  iconPlus: 'img/mainPage/icons/iconPlus3.svg',
  iconClose: 'img/mainPage/icons/iconClose.svg'
}


export function Gallery(state) {

  const pageProps = {
    banner: state.data.banner,
    icon: state.data.icon,
    id: state.data.id,
    slug: state.data.slug,
    title: state.data.title,
    type: state.data.type,
    content: state.data.content
  }

  const [inputTitle, setInputTitle] = useState(pageProps.title); // название галереи
  const [page, setPage] = useState({});
  const [cards, setCards] = useState([]);
  const lastPageRef = useRef({});
  const lastCardsRef = useRef([]);
  const updateLeftMenu = state.updateLeftMenu;

  useEffect(() => {
    console.log("State", state);

    const initialPage = {
      "title": pageProps.title,
      "banner": pageProps.banner,
      "icon": pageProps.icon,
      "type": pageProps.type,
      "content": pageProps.content?.internalContent || [],
      "slug": pageProps.slug
    };
    setPage(initialPage);
    lastPageRef.current = initialPage;
    setCards(initialPage.content);
    lastCardsRef.current = initialPage.cards;


    return () => {
      console.log("Exit from Component!");



      const p = {
        "title": lastPageRef.current.title,
        "banner": lastPageRef.current.banner,
        "icon": lastPageRef.current.icon,
        "type": lastPageRef.current.type,
        "content": lastCardsRef.current.map(item => ({
          ...item,
          id: item.id?.includes("temp_") ? null : item.id
        })),
        "slug": lastPageRef.current.slug
      };


      putChangesOfPage(p);
      updateLeftMenu();

    };
  }, []);

  useEffect(() => {
    setPage(prev => ({
      ...prev, title: inputTitle
    }));
  }, [inputTitle]);

  useEffect(() => {
    lastPageRef.current = page;
  }, [page]);

  useEffect(() => {
    lastCardsRef.current = cards;
  }, [cards]);



  /** */




  const addNewCard = () => {
    const newCard = {
      "id": `temp_${crypto.randomUUID()}`,
      "title": "123",
      "description": "123",
      "color": "#ffffff",
      "number": "123",
      "date": new Date().toISOString(),
      "url": staticImage.imageSimple
    }
    setCards(prevCards => [...prevCards, newCard]);
    console.log("cards", cards);
  }



  return (
    <div className='galleryBox'>
      <div>
        <input type='text' className='inputName' value={inputTitle} onChange={(e) => {
          setInputTitle(e.target.value);
        }
        } />
        <hr />
      </div>

      <div className="boxForGalleryImages scrollable">
        {cards.map((card, index) => (
          <GalleryCard
            key={index}
            staticImage={staticImage}
            card={card}
            setCards={setCards}
          />
        ))}


        <div className='addNewImageToGallery' onClick={addNewCard}>
          <img src={staticImage.iconPlus} alt="Plus" />
          <p> New</p>
        </div>
      </div>


    </div>);

}
