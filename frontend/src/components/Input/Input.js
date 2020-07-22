import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [];
    const divClasses = ['order__input'];
    divClasses.push(props.className);
    let validationError = <p/>;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid');
        validationError = <p className="validationError">{props.error || 'Please enter a valid value!'}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    <option disabled hidden value=''> -- select {props.className} --</option>
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
                onChange={props.changed}/>;
    }

    return (
        <div className={divClasses.join(' ')}>
            {inputElement}
            {validationError}
        </div>
    );

};

export default input;
