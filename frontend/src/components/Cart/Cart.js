import React, {Component} from "react";
import {getCartItems, setCartItems} from '../../lib/localStorageHelpers';
import {getProducts} from "../../lib/service";
import CartItem from "./CartItem/CartItem";
import Spinner from "react-bootstrap/Spinner";

class Cart extends Component {
    state = {
        cartItems: []
    }

    componentDidMount() {
        this.setState({loading: true})

        const cartDataLocal = getCartItems();
        const cartIds = cartDataLocal.map(i => i.id);
        getProducts({ids: cartIds.join(',')}).then(({data}) => {
                const idsInStock = data.map(x => x.id);
                const updatedCartItems = cartDataLocal.filter(x => idsInStock.includes(+x.id));
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
        let data = <div>
            {JSON.stringify(this.state.cartItems)}
            {this.state.cartItems.map(itemData => <CartItem data={itemData}/>)}
        </div>

        if (this.state.loading) {
            data = <Spinner className="spinner" animation="border" variant="secondary"/>
        }

        return (data);
    }
}

export default Cart;
