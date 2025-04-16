import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDevice } from '../../deviceProvider';
import './Nav.css';

export function Nav() {


    const { isMobile, isDesktop } = useDevice();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }


    return (<>
        {isMobile && (
            <button className={`burger-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                ☰
            </button >
        )
        }
        {
            isMobile && isOpen && (
                <ul className="menu open">
                    <li><NavLink to='/'>MainPage</NavLink></li>
                    <li><a href="#feauters">Features</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#aboutUs">About Us</a></li>
                    <li><a href="#contacts">Contacts</a></li>
                    <li><NavLink to="/login">Log in</NavLink></li>
                </ul>
            )
        }

        {
            isDesktop && (<ul className="menu">
                <li><NavLink to='/'>MainPage</NavLink></li>
                <li><a href="#feauters" >Features</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#aboutUs" >About Us</a></li >
                <li><a href="#contacts" >Contacts</a></li >
                <li><NavLink to="/login" >Log in</NavLink></li >
            </ul>)
        }
    </>
    );
}

const setActive = ({ isActive }) => (isActive ? "active" : "");

export default Nav;
