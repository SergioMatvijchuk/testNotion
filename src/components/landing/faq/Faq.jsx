import './Faq.css';
import React, { useState } from 'react';

export function Faq(props) {

    const [state, setState] = useState(props);


    const staticImg = {
        question_img: 'img/landing/question_img.svg',
    }

    return (
        <div className='container2'>
            <div>
                <p>FAQ</p>
                <ul>
                    <li><hr />What can your site be used for?  <i className="fa-brands fa-codepen" aria-hidden="true">+</i></li>
                    <li><hr />Can I use your site for work?  <i className="fa-brands fa-codepen" aria-hidden="true">+</i></li>
                    <li><hr />Is there a limit to the number of notes I can create?  <i className="fa-brands fa-codepen" aria-hidden="true">+</i></li>
                    <li><hr />Can I add images and attachments to my notes?  <i className="fa-brands fa-codepen" aria-hidden="true">+</i></li>
                    <li><hr />How secure is my data?  <i className="fa-brands fa-codepen" aria-hidden="true">+</i></li>
                    <li><hr /></li>
                </ul>

            </div>
            <div>
                <img src={staticImg.question_img} alt="" />
            </div>

        </div>
    )
}