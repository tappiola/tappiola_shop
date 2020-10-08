import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {getProduct} from "../../lib/service";
import Carousel from "react-bootstrap/Carousel";
import './ProductPage.module.css';
import Size from './Size/Size';
import {SpinnerCustom as Spinner} from '../../containers/Spinner/Spinner';
import {connect} from "react-redux";
import {getUpdatedCartItems} from "../../lib/localStorageHelpers";
import classes from './ProductPage.module.css';
import clsx from 'clsx';
import {Error} from "../../containers/Error/Error";

class ProductPage extends Component {
    state = {
        productData: {},
        productImages: [],
        stockLevel: [],
        selectedSize: null,
        purchaseStatus: null
    }

    goBackButton = <div className={classes.goBackButton} onClick={() => this.props.history.goBack()}>
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

    stockLevelSortFunc = (a, b) => {

        const sortingArr = [ 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '32', '34', '36', '38', '40', '42'];
        return sortingArr.indexOf(a.size) - sortingArr.indexOf(b.size);
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
                alt="Product"
            />
        </Carousel.Item>

        const sizesData = this.state.stockLevel.sort(this.stockLevelSortFunc)
            .filter(x => x.size !== 'one_size')
            .map((x, index) => <Size
                data={x}
                key={index}
                clicked={this.sizeClickHandler.bind(this, x.size)}
                selectedSize={this.state.selectedSize}
            />)

        const buttonClasses = clsx({
            [classes.totalSoldOut]: this.getTotalStock() === 0,
            [classes.addToCart]: this.getTotalStock() > 0,
            [classes.sizeSelected]: this.state.selectedSize
        })

        if (this.state.loading) {
            return <Spinner/>
        }

        if (this.state.notFound) {
            return <Error>This product doesn't exist</Error>
        }

       return <div className={classes.productArea}>
            {this.props.history.length > 2 && this.goBackButton}
            <div className={classes.productBlock}>
                <div className={classes.productCarousel}>
                    <Carousel>
                        {this.state.productImages.map((s, index) => getProductImage(s, index))}
                    </Carousel>
                </div>
                <div className={classes.productData}>
                    <h4 className={classes.title}>{this.state.brand}</h4>
                    <h5>{this.state.productData.name}</h5>
                    <div className={classes.description}>{this.state.productData.description}</div>
                    <div>Color: {this.state.productData.color}</div>
                    <div>
                        <span>{discountedPrice ? discountedPrice + ' ' : ''}</span>
                        <span
                            className={clsx({[classes.discount]: discountedPrice})}>{this.state.productData.price}</span>
                        &nbsp;€
                    </div>
                    <div className={classes.sizes}>{sizesData}</div>
                    <div className={classes.purchaseStatus}>{this.state.purchaseStatus}</div>
                    <button
                        className={buttonClasses}
                        onClick={this.buttonClickHandler}
                    >
                        <span>Add to cart</span>
                    </button>
                </div>
            </div>
        </div>

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
