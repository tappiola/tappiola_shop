import React from "react";
import classes from './HamburgerButton.module.css';

export const HamburgerButton = ({menuOpen, onButtonClick}) => {
    return <button
        className={`${classes.toggle} ${classes.button}`}
        onClick={onButtonClick}>
        <span className={`${classes.icon} ${menuOpen ? '' : classes.iconHidden}`}>
            <i className="fas fa-bars"/>
        </span>
        <span className={`${classes.icon} ${menuOpen ? classes.iconHidden : ''}`}>
            <i className="fas fa-times"/>
        </span>
    </button>
}
