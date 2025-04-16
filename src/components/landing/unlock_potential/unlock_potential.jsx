import React from "react";
import './unlock_potential.css';


export default function UnlockPotential({ objState }) {

    return (
        <div className="firstBlock">
            <div className="firstBlockLeftSide">
                <div >
                    <div className="line1"><p>Unlock your <strong>  potential</strong></p></div>
                    <div className="line2">
                        with <img src={objState.imgriff} alt="griff" />
                    </div>
                </div>
                <div className="line3">
                    <p>
                        the ultimate tool for note management
                        helps you harness your creativity and
                        reign in your note</p>
                </div>
                <div className="buttonGetStarted">
                    <a>Get started</a>
                </div>
            </div>
            <div className="firstBlockRightSide">
                <img src={objState.right_fon} alt="You'r champion!" />
            </div>

        </div>
    );
}
