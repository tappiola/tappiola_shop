import React, {Component} from "react";
import classes from './CartItem.module.css';
import {withRouter} from 'react-router-dom';

class CartItem extends Component {
    state = {
        quantity: this.props.data.quantity
    }

    viewProductDetails = () => {
        this.props.history.push(`/category/${this.props.data.category}/product/${this.props.data.id}`);
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

        return (<div className={classes.item}>
            <div className={classes.card} onClick={this.viewProductDetails}>
                <div className={classes.image}
                     style={{backgroundImage: `url(${this.getImageSrc()})`}}>
                </div>
            </div>
            <div className={classes.dataStable}>
                <div>
                    <div className={classes.brand}>{this.props.data.brand.name}</div>
                    <div className={classes.name} onClick={this.viewProductDetails}>{this.props.data.name}</div>
                    <div>Size: {this.props.data.size}</div>
                    <div>Color: {this.props.data.color}</div>
                    <div>{price} €</div>
                </div>
                <div className={classes.delete} onClick={this.props.deleted}>
                    <i className="fa fa-trash-o" aria-hidden="true"/>
                    Delete
                </div>
            </div>
            <div className={classes.quantity}>
                <span className={classes.decrement} onClick={this.decrementClickHandler}>-</span>
                <span className={classes.quantityInput}>{this.state.quantity}</span>
                <span className={classes.increment} onClick={this.incrementClickHandler}>+</span>
            </div>
            <div className={classes.totalPrice}>{price * +this.state.quantity} €</div>
        </div>);
    }
}

export default withRouter(CartItem);
