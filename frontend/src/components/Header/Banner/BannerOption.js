import React from 'react';
import classes from './Banner.module.css';

const BannerOption = (props) => {
    return (<div>
        <span className={classes.separate}><b>{props.boldText}</b></span>
        {props.normalText && <span className={classes.separate}>{props.normalText}</span>}
        <span className={classes.underline}>{props.linkText}</span>
    </div>)
}

export default BannerOption;
