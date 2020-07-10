import React, {Component} from "react";
import './ProductCard.css';

class ProductCard extends Component {
    state = {
        src: this.getSrc(0)
    }

    getSrc(position) {
        return this.props.productData.product_images[0]
            ? this.props.productData.product_images.sort((x, y) => x.position - y.position)[position].image_link
            : 'https://tuktuk4children.org/wp-content/uploads/2017/09/shop-placeholder-600x600.png'
    }


    hover() {
        this.setState({src: this.getSrc(0)});
    }

    unhover() {
        this.setState({src: this.getSrc(1)});
    }

    render() {
        return (
            <div className="product-card">
                <img
                    src={this.state.src}
                    alt="product-card"
                    onMouseOver={this.hover.bind(this)}
                    onMouseOut={this.unhover.bind(this)}
                />
                <div>{this.props.productData.brand.name}</div>
                <div>{this.props.productData.name}</div>
                <div>{this.props.productData.price} €</div>
            </div>)
    }

}

export default ProductCard;
