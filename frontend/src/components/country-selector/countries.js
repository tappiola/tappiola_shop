import countriesList from './countries-list';
import Country from "./country";
import React from "react";

const Countries = (props) => {
    return (<div className='countries-popup'>
        {countriesList.map(countryData => <Country key={countryData.countryName} data={countryData}/>)}
    </div>)
}

export default Countries;