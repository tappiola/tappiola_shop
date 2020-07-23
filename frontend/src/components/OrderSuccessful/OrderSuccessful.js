import React, {Component} from "react";
import './OrderSuccessful.css';
import {getOrder} from "../../lib/service";
import Spinner from "react-bootstrap/Spinner";
import {withRouter} from "react-router-dom";

class OrderSuccessful extends Component {

    state = {error: null, orderItems: []};

    renderItem = (itemData) => {
        return <tr>
            <td>{itemData.product.brand.name}</td>
            <td>{itemData.product.name}</td>
            <td>{itemData.size}</td>
            <td>{itemData.price} €</td>
            <td>{itemData.quantity}</td>
            <td>{itemData.price * itemData.quantity} €</td>
        </tr>
    }

    componentDidMount() {
        this.setState({loading: true});

        getOrder(this.props.match.params.id)
            .then(null, error => error.response.status === 404 && this.setState({
                loading: false,
                error: 'Order not found'
            }))
            .then(({data}) => {
                if (!data.paid) {
                    this.setState({
                        error: 'This order has not been paid yet. Go back to cart and proceed with checkout',
                        loading: false
                    });
                } else (
                    this.setState({orderItems: data.order_items, loading: false}))
            })

            .catch(error => {
                this.setState({loading: false, error: this.state.error || 'Failed to load order details'});
            });
    }

    render() {
        let data;
        if (!this.state.error) {
            data = <div className="order-items">
                <h4>Your order is successful!</h4>
                <div>The items you ordered:</div>
                <table className="order-items__table">
                    <tr>
                        <th>Designer</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                    </tr>
                    {this.state.orderItems.map(item => this.renderItem(item))}
                </table>
            </div>
        } else {
            data = <div className="error">{this.state.error}</div>
        }


        if (this.state.loading) {
            data = <Spinner className="spinner" animation="border" variant="secondary"/>
        }

        return data;
    }
}

export default withRouter(OrderSuccessful);
