import React from 'react';

import classes from './Input.module.css';
import clsx from 'clsx';

const input = (props) => {

    const shouldWarn = props.invalid && props.shouldValidate && props.touched;
    const inputClasses = clsx({[classes.invalid]: shouldWarn});
    const divClasses = clsx(classes.orderInput, props.className);

    const validationError = shouldWarn
        ? <p className={classes.validationError}>{props.error || 'Please enter a valid value!'}</p>
        : <p/>


    const getInputElement = () => {
        switch (props.elementType) {
            case ('input'):
                return <input
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    name={props.className}
                    onChange={props.changed}/>;
            case ('select'):
                return (
                    <select
                        className={inputClasses}
                        value={props.value}
                        name={props.className}
                        onChange={props.changed}>
                        <option disabled hidden value=''> -- select {props.inputType} --</option>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                );
            default:
                return <input
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}/>;
        }
    }


    return (
        <div className={divClasses}>
            {getInputElement()}
            {validationError}
        </div>
    );

};

export default input;
