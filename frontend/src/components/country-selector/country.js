import React from "react";
import './styles.css';

const Country = (props) => {

    const flagStyle = {
        backgroundPosition: `${props.data.flagPosition} center`,
        backgroundImage: "url('https://cdn-static.farfetch-contents.com/portalbox/images/flags.93c40925b8c2d15.jpg')"
    }

    return (
        <div className='country'>
            <span style={flagStyle} className='flag-icon'/>
            <span>{props.data.countryName}</span>
            <span className='currency'>{props.data.currency}</span>
        </div>
    );
}

export default Country;