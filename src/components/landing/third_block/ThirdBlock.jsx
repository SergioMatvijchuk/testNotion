import React from "react";
import './ThirdBlock.css';
import { useDevice } from '../../../deviceProvider.js'

export default function ThirdBlock({ objState }) {


    const { isMobile, isDesktop } = useDevice();


    return (
        (isDesktop && <div className="thirdBlock">
            <div>
                <img src={objState.foot_image_left} alt="pic" />
                <img src={objState.foot_image_middle} alt="pic" />
                <img src={objState.foot_image_right} alt="pic" />
            </div>
            <div>
                <div>
                    <p>Variable notes</p>
                    <span>You can capture your ideas in various formats, whether it's tables, boards, galleries, and more, adapting to your preferred style of organization</span>
                </div>
                <div>
                    <p>Go to your goals</p>
                    <span>From structured work-related notes to creatively organizing personal thoughts, our platform empowers you to adapt notes to different contexts </span>
                </div>
                <div>
                    <p>Accessible Simplicity</p>
                    <span>Enjoy effortless navigation and a user-friendly interface, ensuring that anyone can quickly understand and utilize our platform to its fullest potential.</span>
                </div>
            </div>
        </div>) ||

        (isMobile && <div className="thirdBlock">
            <div className="imgBlock_mob">
                <img src={objState.foot_image_left} alt="pic" />
            </div>
            <div className="txtBlock_mob">
                <p>Variable notes</p>
                <span>You can capture your ideas in various formats, whether it's tables, boards, galleries, and more, adapting to your preferred style of organization</span>
            </div>
            <div className="imgBlock_mob">
                <img src={objState.foot_image_middle} alt="pic" />
            </div>
            <div className="txtBlock_mob">
                <p>Go to your goals</p>
                <span>From structured work-related notes to creatively organizing personal thoughts, our platform empowers you to adapt notes to different contexts </span>
            </div>
            <div className="imgBlock_mob">
                <img src={objState.foot_image_right} alt="pic" />
            </div>
            <div className="txtBlock_mob">
                <p>Accessible Simplicity</p>
                <span>Enjoy effortless navigation and a user-friendly interface, ensuring that anyone can quickly understand and utilize our platform to its fullest potential.</span>
            </div>
        </div>)

    )
}