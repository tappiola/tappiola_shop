import React, {Component} from "react";
import './CartItem.css';
import {withRouter} from 'react-router-dom';

class CartItem extends Component {
    state = {
        quantity: this.props.data.quantity
    }

    viewProductDetails = () => {
        this.props.history.push(`/category/${this.props.data.category}/product/${this.props.data.id}`)
    }

    getMaxQuantity = () => {
        return this.props.data.stock_level.find(x => x.size === this.props.data.size).stock_level;
    }

    setNewQuantity = (newQuantity) => {
        this.setState({quantity: newQuantity});
        this.props.quantityChanged(newQuantity);
    }

    decrementClickHandler = () => {
        const newQuantity = this.state.quantity > 1 ? this.state.quantity - 1 : 1
        this.setNewQuantity(newQuantity);
    }

    incrementClickHandler = () => {
        const maxQuantity = this.getMaxQuantity();
        const newQuantity = this.state.quantity < maxQuantity ? this.state.quantity + 1 : maxQuantity;
        this.setNewQuantity(newQuantity);
    }

    getImageSrc = () => {
        return this.props.data.product_images.sort((x, y) => x.position - y.position)[0].image_link;
    }

    render() {
        const price = this.props.data.discounted_price || this.props.data.price;

        return (<div className="cart__item">
            <div className="cart__card" onClick={this.viewProductDetails}>
                <div className="cart__image"
                     style={{backgroundImage: `url(${this.getImageSrc()})`}}>
                </div>
            </div>
            <div className="cart__data-stable">
                <div>
                    <div className="cart__brand">{this.props.data.brand.name}</div>
                    <div className="cart__name" onClick={this.viewProductDetails}>{this.props.data.name}</div>
                    <div>Size: {this.props.data.size}</div>
                    <div>Color: {this.props.data.color}</div>
                    <div>{price} €</div>
                </div>
                <div className="cart__delete" onClick={this.props.deleted}>
                    <i className="fa fa-trash-o" aria-hidden="true"/>
                    Delete
                </div>
            </div>
            <div className="cart__quantity">
                <span className="cart__decrement" onClick={this.decrementClickHandler}>-</span>
                <span className="cart__quantity-input">{this.state.quantity}</span>
                <span className="cart__increment" onClick={this.incrementClickHandler}>+</span>
            </div>
            <div className="cart__totalPrice">{price * +this.state.quantity} €</div>
        </div>);
    }
}

export default withRouter(CartItem);
