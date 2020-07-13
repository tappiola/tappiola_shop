import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {getProduct} from "../../lib/service";

class ProductPage extends Component{
    state = {
        productData: {},
        productImages: [],
        stockLevel: []
    }

    goBackButton = <button onClick={() => this.props.history.goBack()}>Back</button>;

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

        const getProductImage = (image) => <div className="product-image"
                                              id={image.position}
                     style={{backgroundImage: `url(${image.image_link})`}}>
                </div>

        return(<div>
            {this.props.history.length > 2 && this.goBackButton}

            <h1>{this.state.productData.name}</h1>
            <div>{this.state.productData.description}</div>
            <div>{this.state.productData.color}</div>
                <div>{this.state.productData.name}</div>
                <div>
                    <span>{discountedPrice ? discountedPrice + ' ' : ''}</span>
                    <span className={discountedPrice ? 'discount' : undefined}>{this.state.productData.price}</span>
                    &nbsp;€
                </div>
            <div>{this.state.productImages.map(s => getProductImage(s))}</div>
            </div>)
    }
}

export default withRouter(ProductPage);
