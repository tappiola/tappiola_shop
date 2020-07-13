import React, {Component} from "react";
import './ProductCard.css';
import {withRouter} from 'react-router-dom';

class ProductCard extends Component {
    state = {
        imagesSorted: this.props.productData.product_images.sort((x, y) => x.position - y.position)
    }

    getSrc(position) {
        return this.state.imagesSorted[0]
            ? this.state.imagesSorted[position].image_link
            : 'https://tuktuk4children.org/wp-content/uploads/2017/09/shop-placeholder-600x600.png'
    }


    hover= () => {
        this.setState({src: this.getSrc(1)});
    }

    unhover = () => {
        this.setState({src: this.getSrc(0)});
    }

    clickHandler = (id) => {
        this.props.history.push(`/product/${id}`)
    }

    componentDidMount() {
        this.setState({src: this.getSrc(0)});
    }

    render() {
        const discountedPrice = this.props.productData.discounted_price;

        return (
            <div className="product-card">
                <div className="product-image"
                     style={{backgroundImage: `url(${this.state.src})`}}
                     onMouseOver={this.hover.bind(this)}
                     onMouseOut={this.unhover.bind(this)}
                    onClick={this.clickHandler.bind(this, this.props.productData.id)}>
                </div>
                <br/>
                <div>{this.props.productData.brand.name}</div>
                <div>{this.props.productData.name}</div>
                <div>
                    <span>{discountedPrice ? discountedPrice + ' ' : ''}</span>
                    <span className={discountedPrice ? 'discount' : undefined}>{this.props.productData.price}</span>
                    &nbsp;€
                </div>
            </div>)
    }

}

export default withRouter(ProductCard);
