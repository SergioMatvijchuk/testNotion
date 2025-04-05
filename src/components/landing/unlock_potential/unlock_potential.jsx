import React from "react";
import './unlock_potential.css';


export default function UnlockPotential({ objState }) {

    return (
        <div className="firstBlock">
            <div className="firstBlockLeftSide">
                <div >
                    <p>Unlock your potential
                        with
                        <img src={objState.imgriff}></img>
                    </p>
                </div>
                <div>
                    <p>
                        the ultimate tool for note management
                        helps you harness your creativity and
                        reign in your note</p>
                </div>
                <div>
                    <a>Get started</a>
                </div>
            </div>
            <div className="firstBlockRightSide">
                <img src={objState.right_fon} alt="You'r champion!" />
            </div>

        </div>
    );
}
