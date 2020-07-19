import React, {Component} from "react";
import {submitOrder} from "../../lib/service";
import {withRouter} from "react-router-dom";
import {setCartItems} from "../../lib/localStorageHelpers";
import {connect} from "react-redux";

class Checkout extends Component {

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value.trim()})
    };

    sumbitClickHandler = () => {
        const orderId = this.props.match.params.id;
        const data = {
            email: this.state.email,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            country: this.state.country,
            address: this.state.address,
            city: this.state.city,
            region: this.state.region,
            zip: this.state.zip,
            shipping_method: "DHL",
            card_data: {
                number: this.state.cardNumber,
                exp_date: this.state.expDate,
                cvv: this.state.cvv,
                name: this.state.nameOnCard
            }
        }

        submitOrder(orderId, data).then(({data}) => {
            this.setState(data);
            alert(JSON.stringify(data));
        })
        this.props.onButtonClick([]);
    }

    render() {
        return (<div>
            <h4>Shipping Address</h4>
            <input name="firstName" placeholder="First Name" onChange={this.handleChange}/>
            <input name="lastName" placeholder="Last Name" onChange={this.handleChange}/>
            <input name="country" placeholder="Country" onChange={this.handleChange}/>
            <input name="address" placeholder="Address" onChange={this.handleChange}/>
            <input name="city" placeholder="City" onChange={this.handleChange}/>
            <input name="region" placeholder="Region/Province" onChange={this.handleChange}/>
            <input name="zip" placeholder="ZIP/Postal Code" onChange={this.handleChange}/>
            <input name="phone" placeholder="Phone Number" onChange={this.handleChange}/>
            <input name="email" placeholder="Email Address" onChange={this.handleChange}/>
            <h4>Payment Method</h4>
            <input name="cardNumber" maxLength='16' placeholder="Credit Card Number" onChange={this.handleChange}/>
            <input name="expDate" maxLength='5' placeholder="Exp. Date" onChange={this.handleChange}/>
            <input name="cvv" maxLength='3' placeholder="CVV" onChange={this.handleChange}/>
            <input name="nameOnCard" placeholder="Name" onChange={this.handleChange}/>
            <button onClick={this.sumbitClickHandler}>Submit</button>
            <div>{JSON.stringify(this.props.cartDataLocal)}</div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        cartDataLocal: state.cartDataLocal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClick: (cartDataLocal) => dispatch({
            type: 'UPDATE_CART',
            cartDataLocal: cartDataLocal
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
