import React from "react";

export default function Die(props) {

    return (
        <div
            className={props.isHeld ? "die-clicked" : "die"}
            onClick={props.holdDice}

        >
            {props.value}
        </div>
    )
}