import React from "react";
import './ThirdBlock.css';

export default function ThirdBlock({ objState }) {



    return (

        <div className="thirdBlock">
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
        </div>
    )
}