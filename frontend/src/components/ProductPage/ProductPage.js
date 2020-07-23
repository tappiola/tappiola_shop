import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {getProduct} from "../../lib/service";
import Carousel from "react-bootstrap/Carousel";
import './ProductPage.css';
import Size from './Size/Size';
import Spinner from "react-bootstrap/Spinner";
import {connect} from "react-redux";
import {getUpdatedCartItems} from "../../lib/localStorageHelpers";

class ProductPage extends Component {
    state = {
        productData: {},
        productImages: [],
        stockLevel: [],
        selectedSize: null,
        purchaseStatus: null
    }

    goBackButton = <div className="go-back-button" onClick={() => this.props.history.goBack()}>
        <i className="fa fa-arrow-left" aria-hidden="true"/>
        &nbsp;Back
    </div>;

    getProductInfo(id) {
        this.setState({loading: true});

        return getProduct(id)
            .then(null, error => error.response.status === 404 && this.setState({notFound: true}))
            .then(({data}) => {
                this.setState({
                    productData: data,
                    productImages: data.product_images,
                    stockLevel: data.stock_level,
                    brand: data.brand.name
                });
                data.stock_level.filter(x => x.size === 'one_size').length !== 0
                && this.setState({selectedSize: 'one_size'});
            }).catch(err => console.log(err)).finally(() => this.setState({loading: false}));
    }

    getTotalStock = () => {
        return this.state.stockLevel.reduce((prev, curr) => prev + curr.stock_level, 0);
    }


    sizeClickHandler = (newSize) => {
        this.setState({
            selectedSize: this.state.selectedSize !== newSize ? newSize : null,
            purchaseStatus: null
        });
    }

    buttonClickHandler = () => {
        if (this.state.selectedSize) {
            const newItemValue = {
                id: +this.props.match.params.productId,
                size: this.state.selectedSize,
                quantity: 1
            }
            const maxQuantity = this.state.stockLevel.find(x => x.size === this.state.selectedSize).stock_level;

            const [updatedData, purchaseStatus] = getUpdatedCartItems(this.props.cartDataLocal, newItemValue, maxQuantity);
            this.props.onButtonClick(updatedData);
            this.setState({purchaseStatus: purchaseStatus});
        }
    }

    componentDidMount() {
        this.getProductInfo(this.props.match.params.productId);
    }

    render() {
        const discountedPrice = this.state.productData.discounted_price;

        const getProductImage = (image, index) => <Carousel.Item key={index}>
            <img
                className="d-block w-100"
                src={image.image_link}
                alt="Product image"
            />
        </Carousel.Item>

        const sizesData = this.state.stockLevel
            .filter(x => x.size !== 'one_size')
            .map((x, index) => <Size
                data={x}
                key={index}
                clicked={this.sizeClickHandler.bind(this, x.size)}
                selectedSize={this.state.selectedSize}
            />)
        const buttonClasses = this.getTotalStock() === 0 ? 'product__total-sold-out'
            : this.state.selectedSize ? 'product__add-to-cart product__size-selected' : 'product__add-to-cart'

        let productData = <div className="product__area">
            {this.props.history.length > 2 && this.goBackButton}
            <div className="product__block">
                <div className="product__carousel">
                    <Carousel>
                        {this.state.productImages.map((s, index) => getProductImage(s, index))}
                    </Carousel>
                </div>
                <div className="product__data">
                    <h4 className="product__title">{this.state.brand}</h4>
                    <h5>{this.state.productData.name}</h5>
                    <div className="product__description">{this.state.productData.description}</div>
                    <div>Color: {this.state.productData.color}</div>
                    <div>
                        <span>{discountedPrice ? discountedPrice + ' ' : ''}</span>
                        <span
                            className={discountedPrice ? 'product__discount' : undefined}>{this.state.productData.price}</span>
                        &nbsp;€
                    </div>
                    <div className="product__sizes">{sizesData}</div>
                    <div className="product__purchase-status">{this.state.purchaseStatus}</div>
                    <button
                        className={buttonClasses}
                        onClick={this.buttonClickHandler}
                    >
                        <span>Add to cart</span>
                    </button>
                </div>
            </div>
        </div>

        if (this.state.loading) {
            productData = <Spinner className="spinner" animation="border" variant="secondary"/>
        }

        if (this.state.notFound) {
            productData = <div className="error">This product doesn't exist</div>
        }

        return (productData)
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));
