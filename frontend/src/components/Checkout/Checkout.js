import React, {Component} from "react";
import {submitOrder} from "../../lib/service";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Input from "../Input/Input";
import './Checkout.css';
import axios from 'axios';

class Checkout extends Component {
    state = {
        orderForm: {
            firstName: {
                formId: 1,
                apiKey: 'first_name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                formId: 1,
                apiKey: 'last_name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                formId: 1,
                apiKey: 'country',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Belarus', displayValue: 'Belarus'},
                        {value: 'Russia', displayValue: 'Russia'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                formId: 1,
                apiKey: 'address',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                formId: 1,
                apiKey: 'city',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            region: {
                formId: 1,
                apiKey: 'region',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Region/Province'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                formId: 1,
                apiKey: 'zip',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP/Postal Code',
                    maxLength: 10
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                formId: 1,
                apiKey: 'email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            cardNumber: {
                formId: 2,
                apiKey: 'card_number',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Credit Card Number',
                    maxLength: 16
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 16,
                    maxLength: 16
                },
                valid: false,
                touched: false
            },
            expDate: {
                formId: 2,
                apiKey: 'exp_date',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Exp. Date',
                    maxLength: 5
                },
                value: '',
                validation: {
                    required: true,
                    isExpDate: true
                },
                valid: false,
                touched: false
            },
            cvv: {
                formId: 2,
                apiKey: 'cvv',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CVV',
                    maxLength: 3
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 3,
                    maxLength: 3
                },
                valid: false,
                touched: false
            },
            nameOnCard: {
                formId: 2,
                apiKey: 'name_on_card',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            // a stub for shipping method
            shippingMethod: {
                formId: 3,
                apiKey: 'shipping_method',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: 'DHL',
                validation: {
                    required: true
                },
                valid: true,
                touched: true
            }
        }
    }


    checkValidity(value, rules) {
        let isValid = true;
        let errorMessage = null;
        if (!rules) {
            return [isValid, errorMessage];
        }

        if (rules.required && value.trim() === '') {
            isValid = false;
            errorMessage = 'Field should not be empty';
            return [isValid, errorMessage];
        }

        if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Field should have minimum length of ${rules.minLength} symbols`;
            return [isValid, errorMessage];
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `Field should have maximum length of ${rules.maxLength} symbols`;
            return [isValid, errorMessage];
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!pattern.test(value)){
                isValid = false;
                errorMessage = 'Please enter a valid Email';
                return [isValid, errorMessage];
            }
        }

        if (rules.isExpDate && !/^[0-9][0-2]\/\d{2}?/.test(value)) {
            isValid = false;
            errorMessage = 'Please enter date in format MM/YY';
            return [isValid, errorMessage];
        }

        if (rules.isNumeric && !/^\d+$/.test(value)) {
            isValid = false;
            errorMessage = 'Field should contain only numbers';
            return [isValid, errorMessage];
        }

        return [isValid, errorMessage];
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    orderHandler = (event) => {
        if (this.state.formIsValid) {
            event.preventDefault();
            this.setState({loading: true});
            const orderId = this.props.match.params.id;
            const data = {};
            for (let formElementIdentifier in this.state.orderForm) {
                data[this.state.orderForm[formElementIdentifier].apiKey] = this.state.orderForm[formElementIdentifier].value;
            }

            submitOrder(orderId, data).then(({data}) => {
                this.setState({data, loading: false});
                alert(JSON.stringify(data));
            }).catch(error => {
                this.setState({loading: false});
            });
            this.props.onButtonClick([]);
        } else {
            for (let key in this.state.orderForm) {
                let orderForm = {...this.state.orderForm};
                let currentInput = orderForm[key];
                [currentInput.valid, currentInput.error] = this.checkValidity(currentInput.value, currentInput.validation);
                currentInput.touched = true;
                this.setState({orderForm});
            }
        }
    }

    inputElementsByFormId = (formId) => {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        return formElementsArray
            .filter(formElement => formElement.config.formId === formId)
            .map(formElement => (
                <Input
                    key={formElement.id}
                    className={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    error={formElement.config.error}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))
    }
    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(({data}) => {
            const orderFormCopy = {...this.state.orderForm};
            orderFormCopy.country.elementConfig.options = data.map(x => ({value: x.name, displayValue: x.name}));
            this.setState({orderForm: orderFormCopy});
        })
    }

    render() {
        return (<div>
            <div className="checkout__area">
            <form className="checkout__form">
                <h4>Shipping Address</h4>
                {this.inputElementsByFormId(1)}
                <h4>Payment Method</h4>
                {this.inputElementsByFormId(2)}
            </form>
            <button className="checkout__button" onClick={this.orderHandler}>Submit</button>
        </div>
        <div></div>
            </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onButtonClick: (cartDataLocal) => dispatch({
            type: 'UPDATE_CART',
            cartDataLocal: cartDataLocal
        })
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Checkout));
