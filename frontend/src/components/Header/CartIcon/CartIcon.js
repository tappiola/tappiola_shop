import React, {Component} from "react";
import './CartIcon.css';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

class CartIcon extends Component {
    state = {
        cartCount: 0
    }

    cartClickHandler = () => {
        this.props.history.push('/cart');
    }

    getCartCount = (data) => {
        return data.reduce((prev, next) => prev + next.quantity, 0);
    }

    componentDidMount() {
        this.setState({cartCount: this.getCartCount(this.props.cartDataLocal)});
    }

    componentWillReceiveProps(nextProps, nextValue) {
        if (this.props.cartDataLocal !== nextProps.cartDataLocal) {
            this.setState({cartCount: this.getCartCount(nextProps.cartDataLocal)});
        }
    }

    render() {

        return (<div className='header__main-icons'>
            <div onClick={this.cartClickHandler}>
                <span className="header__cart-count">{this.state.cartCount > 0 ? this.state.cartCount : ''}</span>
                <svg className="header__bag-icon" viewBox="0 0 32 32">
                    <path
                        d="M24.444 8.6c-0.087-4.606-3.875-8.037-8.5-8.037s-8.425 3.225-8.5 8.037h-7.444v23.4h32v-23.4h-7.556zM15.931 2.6c3.375 0 6.187 2.45 6.269 6h-12.537c0.088-3.55 2.894-6 6.269-6z"></path>
                </svg>
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        cartDataLocal: state.cartDataLocal
    }
};

export default connect(mapStateToProps)(withRouter(CartIcon));
