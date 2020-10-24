import React, {Component} from "react";
import classes from './ProductCard.module.css';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import {STATICS_URL} from "../../constants";

class ProductCard extends Component {
    state = {
        imagesSorted: this.props.productData.product_images.sort((x, y) => x.position - y.position)
    }

    getSrc(position) {
        return this.state.imagesSorted[position]
            ? this.state.imagesSorted[position].image_link
            : `${STATICS_URL}/placeholder.png`
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
            <div className={classes.productCard}>
                <div className={classes.productImage}
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
                        className={clsx({[classes.productDiscount]: discountedPrice})}>{this.props.productData.price}</span> €
                </div>
            </div>)
    }

}

export default withRouter(ProductCard);
