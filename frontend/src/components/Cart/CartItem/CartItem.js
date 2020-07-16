import React, {Component} from "react";
import './CartItem.css';

class CartItem extends Component {

    componentDidMount() {

    }


    render() {
        const price = this.props.data.discounted_price || this.props.data.price;

        return (<div className="cart-item">
            <div className="product-card-small">
                <div className="product-image"
                     style={{backgroundImage: `url(${this.props.data.product_images[0].image_link})`}}>
                </div>
            </div>
            <div className="cart-data-stable">
                <div className="cart-brand">{this.props.data.brand.name}</div>
                <div>{this.props.data.name}</div>
                <div>Size: {this.props.data.size}</div>
                <div>Color: {this.props.data.color}</div>
                <div>{price} €</div>
            </div>
            <div className="quantity">{this.props.data.quantity}</div>
            <div>{price * +this.props.data.quantity} €</div>

        </div>);
    }
}

export default CartItem;
