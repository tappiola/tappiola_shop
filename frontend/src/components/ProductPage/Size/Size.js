import React from "react";
import './Size.css';

function Size(props) {
 return (<div className='sold-out'>
  {props.data.size}
 </div>)
}

export default Size;