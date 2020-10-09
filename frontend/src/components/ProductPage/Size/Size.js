import React, {Component} from "react";
import './Size.module.css';
import classes from './Size.module.css';
import clsx from 'clsx';

class Size extends Component {

    render() {

        const productClasses = clsx(classes.productSize, {
            [classes.productSizeSelected]: this.props.selectedSize === this.props.data.size,
            [classes.productSoldOut]: this.props.data.stock_level === 0
        })

        return (<div
            className={productClasses}
            onClick={this.props.clicked}
        >
            {this.props.data.size}
        </div>)
    }
}

export default Size;
