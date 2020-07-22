import React from 'react';

import './Input.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = ['order__input'];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid');
        validationError = <p className="validationError">{props.error || 'Please enter a valid value!'}</p>;
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    <option disabled value=''> -- select an option -- </option>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='order__input'>
            {inputElement}
            {validationError}
        </div>
    );

};

export default input;
