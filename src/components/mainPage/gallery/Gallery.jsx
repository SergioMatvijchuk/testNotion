import './Gallery.css';
import { useRef, useState } from 'react';
import { GalleryCard } from './galleryCard/GalleryCard';
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
  const [inputNameBoard, setInputNameBoard] = useState(pageProps.title);
  const [inputNewImageCard, setInputNewImageCard] = useState([]);
  const [page, setPage] = useState({});
  const [cards, setCards] = useState([]);
  const lastPageRef = useRef({});
  const lastCardsRef = useRef([]);


  useEffect(() => {
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
    lastPageRef.current = initialPage.cards;



    return () => {
      console.log("Exit from Component!");

    };
  }, []);



  const addnewGalleryCard = () => {
    setInputNewImageCard((inputNewImageCard) =>
      [...inputNewImageCard,
      <GalleryCard key={inputNewImageCard.length} staticImage={staticImage} id={`card${inputNewImageCard?.length || 0}`} />
      ]);
  }



  return (
    <div className='galleryBox'>

      <div>
        <input type='text' className='inputName' value={inputNameBoard} onChange={(e) => {
          setInputNameBoard(e.target.value);
        }
        } />

        <hr />
      </div>

      <div className="boxForGalleryImages scrollable">
        {inputNewImageCard}
        <div className='addNewImageToGallery' onClick={addnewGalleryCard}>
          <img src={staticImage.iconPlus} alt="Plus" />
          <p> New</p>
        </div>
      </div>


    </div>);

}



/**import './Gallery.css';
import { useState } from 'react';
import { GalleryCard } from './galleryCard/GalleryCard';

const staticImage = {
  imageSimple: 'img/mainPage/gallery/1729314189.jpg',
  iconPlus: 'img/mainPage/icons/iconPlus3.svg',
  iconClose: 'img/mainPage/icons/iconClose.svg',
};

export function Gallery({ cardName }) {
  const [inputNameBoard, setInputNameBoard] = useState(cardName);
  const [cards, setCards] = useState([]);

  const addNewGalleryCard = () => {
    setCards(prev => [
      ...prev,
      {
        id: `card${prev.length}`,
        image: staticImage,
      },
    ]);
  };

  return (
    <div className='galleryBox'>
      <div>
        <input
          type='text'
          className='inputName'
          value={inputNameBoard}
          onChange={(e) => setInputNameBoard(e.target.value)}
        />
        <hr />
      </div>

      <div className="boxForGalleryImages scrollable">
        {cards.map((card, index) => (
          <GalleryCard key={card.id} staticImage={card.image} id={card.id} />
        ))}

        <div className='addNewImageToGallery' onClick={addNewGalleryCard}>
          <img src={staticImage.iconPlus} alt="Plus" />
          <p>New</p>
        </div>
      </div>
    </div>
  );
}
 */