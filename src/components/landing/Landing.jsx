import { Nav } from './Nav.jsx';
import './Landing.css';
import { AboutUs } from './about_us/AboutUs.jsx';
import { Faq } from './faq/Faq.jsx';
import { Contacts } from './contacts/Contacts.jsx';
import { ScrollToTop } from '.././ScrollToTop/ScrollToTop.jsx';
import UnlockPotential from './unlock_potential/unlock_potential.jsx';
import ThirdBlock from './third_block/ThirdBlock.jsx';
import { useDevice } from '../../deviceProvider.js';
import { CraftIdees } from './craft_idees/CraftIdees.jsx';


export function Landing() {

    const objState = {
        image_header: 'img/landing/Rectangle183.svg',
        google_icon: 'img/loginpage/google_icon.svg',
        imgriff: 'img/landing/Frame13.svg',
        right_fon: 'img/landing/illustration21.svg',
        gorizontal_block_img: 'img/landing/Template1.png',
        vertical_right_block_img: 'img/landing/Template3.png',
        vertical_left_block_img: 'img/landing/Template2.png',
        foot_image_left: 'img/landing/foot-image-left.png',
        foot_image_middle: 'img/landing/foot-image-middle.png',
        foot_image_right: 'img/landing/foot-image-right.png',
    }

    const { isMobile, isDesktop } = useDevice();



    return (
        <div className="Landing">
            <div className="header">
                <div className='leftIconLanding'>
                    <a href="#"><img src={objState.image_header} alt="" /></a>
                </div>
                <Nav />
            </div>
            <hr id='hr1' />
            <UnlockPotential objState={objState} />
            <CraftIdees objState={objState} />
            <ThirdBlock objState={objState} />
            <div id='aboutUs'><AboutUs /></div>
            <div id='faq'><Faq /></div>
            <div id='contacts'><Contacts /></div>
            <div><ScrollToTop /></div>


        </div>
    );


}


