import React, {Component} from "react";
import './ProductCard.css';
import {withRouter} from 'react-router-dom';

class ProductCard extends Component {
    state = {
        imagesSorted: this.props.productData.product_images.sort((x, y) => x.position - y.position)
    }

    getSrc(position) {
        return this.state.imagesSorted[position]
            ? this.state.imagesSorted[position].image_link
            : 'https://tappiola-shop.s3.eu-west-2.amazonaws.com/placeholder.png'
    }


    hover = () => {
        this.setState({src: this.getSrc(1)});
    }

    unhover = () => {
        this.setState({src: this.getSrc(0)});
    }

    clickHandler = (categoryId, id) => {
        this.props.history.push(`/category/${categoryId}/product/${id}`)
    }

    componentDidMount() {
        this.setState({src: this.getSrc(0)});
    }

    render() {
        const discountedPrice = this.props.productData.discounted_price;

        return (
            <div className="product__card">
                <div className="product__image"
                     style={{backgroundImage: `url(${this.state.src})`}}
                     onMouseOver={this.hover.bind(this)}
                     onMouseOut={this.unhover.bind(this)}
                     onClick={this.clickHandler.bind(this, this.props.productData.category, this.props.productData.id)}>
                </div>
                <br/>
                <div>{this.props.productData.brand.name}</div>
                <div>{this.props.productData.name}</div>
                <div>
                    <span>{discountedPrice ? discountedPrice + ' ' : ''}</span>
                    <span
                        className={discountedPrice ? 'product__discount' : undefined}>{this.props.productData.price}</span>
                    &nbsp;€
                </div>
            </div>)
    }

}

export default withRouter(ProductCard);
