import { CardInfo } from './cardInfo/CardInfo'
import './GalleryCard.css'



export function GalleryCard({ staticImage }) {

    const setCardInfo = () => {
        alert('qq')
    }
    return (
        <div onClick={setCardInfo}>
            <img src={staticImage.imageSimple} alt="asd" />
            <p>ImageName</p>
        </div>
    )




}