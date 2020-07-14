import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {getProduct} from "../../lib/service";
import Carousel from "react-bootstrap/Carousel";
import './ProductPage.css';
import Size from './Size/Size';

class ProductPage extends Component {
    state = {
        productData: {},
        productImages: [],
        stockLevel: []
    }

    goBackButton = <div className="goBackButton" onClick={() => this.props.history.goBack()}>
        <i className="fa fa-arrow-left" aria-hidden="true"/>
        &nbsp;Back
    </div>;

    getProductInfo(id) {
        return getProduct(id).then(({data}) => {
            this.setState({
                productData: data,
                productImages: data.product_images,
                stockLevel: data.stock_level
            })
        });
    }

    componentDidMount() {
        this.getProductInfo(this.props.match.params.productId);
    }

    render() {
        console.log(this.state.productImages)
        const discountedPrice = this.state.productData.discounted_price;

        const getProductImage = (image, index) => <Carousel.Item key={index}>
            <img
                className="d-block w-100"
                src={image.image_link}
                alt="Product image"
            />
        </Carousel.Item>

        return (
            <div className="product-area">
                {this.props.history.length > 2 && this.goBackButton}
                <div className="product-block">
                    <div className="carousel-block">
                        <Carousel>
                            {this.state.productImages.map((s, index) => getProductImage(s, index))}
                        </Carousel>
                    </div>
                    <div className="product-data">
                        <h1>{this.state.productData.name}</h1>
                        <div className="product-description">{this.state.productData.description}</div>
                        <div>Color: {this.state.productData.color}</div>
                        <div>
                            <span>{discountedPrice ? discountedPrice + ' ' : ''}</span>
                            <span
                                className={discountedPrice ? 'discount' : undefined}>{this.state.productData.price}</span>
                            &nbsp;€
                        </div>
                        {this.state.stockLevel
                            .filter(x => x.size !== 'one_size')
                            .map((x, index) => <Size data={x} key={index}/> )}
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(ProductPage);
