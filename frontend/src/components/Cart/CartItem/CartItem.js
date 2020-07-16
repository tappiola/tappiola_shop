import React, {Component} from "react";

class CartItem extends Component{

    componentDidMount() {


    }


    render() {
        const price = this.props.data.discounted_price || this.props.data.price;

    return(<div>
        <div>{this.props.data.brand.name}</div>
        <div>{this.props.data.name}</div>
        <div>{this.props.data.size}</div>
        <div>{this.props.data.color}</div>
        <div>{price} EUR</div>
        <div>{this.props.data.quantity}</div>
        <div>{price * +this.props.data.quantity} EUR</div>
    </div>);
}
}

export default CartItem;
