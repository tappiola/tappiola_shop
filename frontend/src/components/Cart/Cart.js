import React, {Component} from "react";
import {getCartItems, setCartItems} from '../../lib/localStorageHelpers';
import {getProducts} from "../../lib/service";
import CartItem from "./CartItem/CartItem";
import Spinner from "react-bootstrap/Spinner";
import './Cart.css';
import {withRouter} from 'react-router-dom';

class Cart extends Component {
    state = {
        cartItems: [],
        cartDataLocal: []
    }

    getStockLevelForCartItem = (cartItem, data) => {
        return data
            .filter(d => d.id === +cartItem.id)[0].stock_level
            .filter(d => d.size === cartItem.size)[0].stock_level;
    }

    deleteItemHandler = (id, size) => {
        const updatedCartItems = this.state.cartItems.filter(x => !(x.id === id && x.size === size));
        const cartDataLocal = this.state.cartDataLocal.filter(x => x.id !== id && x.size !== size);
        this.setState({cartItems: updatedCartItems, cartDataLocal});
        setCartItems(cartDataLocal);
    }

    quantityChangedHandler = (id, size, newQuantity) => {
        const cartItems = this.state.cartItems.map(
            item => item.id === id && item.size === size
                ? {...item, quantity: newQuantity}
                : item
        );
        const cartDataLocal = this.state.cartItems.map(
            item => item.id === id && item.size === size
                ? {...item, quantity: newQuantity}
                : item
        );
        this.setState({cartItems, cartDataLocal});
        setCartItems(cartDataLocal);
    }

    componentDidMount() {
        this.setState({loading: true});

        const cartDataLocal = getCartItems();
        this.setState({cartDataLocal});
        const cartIds = Array.from(new Set(cartDataLocal.map(i => i.id)));
        getProducts({ids: cartIds.join(',')}).then(({data}) => {
                const idsInStock = data.map(x => x.id);
                const updatedCartItems = cartDataLocal
                    .filter(x => idsInStock.includes(+x.id))
                    .filter(x => this.getStockLevelForCartItem(x, data) > 0);
                setCartItems(updatedCartItems);

                const cartItems = updatedCartItems.map(item => {
                    const itemSameId = data.filter(x => +x.id === +item.id)[0];
                    return {...item, ...itemSameId};
                })
                this.setState({cartItems, loading: false});
            }
        );
    }

    render() {
        let data = <React.Fragment>
            <div>
                <h4 className="cart-header">Your cart items</h4>
                <div className="cart">
                    <div className="cart__items">
                        {this.state.cartItems.map((itemData, index) => <CartItem
                            key={index}
                            data={itemData}
                            deleted={this.deleteItemHandler.bind(this, itemData.id, itemData.size)}
                            quantityChanged={this.quantityChangedHandler.bind(this, itemData.id, itemData.size)}
                        />)}
                    </div>
                    <div className="cart-total">
                        <div>{this.state.cartItems.reduce(
                            (prev, curr) => prev + (curr.discounted_price || curr.price) * curr.quantity, 0)
                        }</div>
                    </div>
                </div>
            </div>
        </React.Fragment>

        if (this.state.loading) {
            data = <Spinner className="spinner" animation="border" variant="secondary"/>
        }

        return (<div>
            {data}
        </div>);
    }
}

export default withRouter(Cart);
