import React from 'react';

const BannerOption = (props) => {
    return (<div>
        <span className='separate'><b>{props.boldText}</b></span>
        {props.normalText && <span className='separate'>{props.normalText}</span>}
        <span className='underline'><a>{props.linkText}</a></span>
    </div>)
}

export default BannerOption;