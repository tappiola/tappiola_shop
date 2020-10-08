import React, {Component} from "react";
import './Size.module.css';
import classes from './Size.module.css';
import clsx from 'clsx';

class Size extends Component {

    state = {
        isSelected: false
    };

    stockLevel = this.props.data.stock_level;

    componentWillReceiveProps(nextProps, nextValue) {
        if (this.stockLevel > 0) {
            if (nextProps.selectedSize === this.props.data.size) {
                this.setState(state => ({isSelected: !state.isSelected}));
            } else {
                this.setState({isSelected: false});
            }
        }
    }

    render() {
        const productClasses = clsx(classes.productSize, {
            [classes.productSizeSelected]: this.state.isSelected,
            [classes.productSoldOut]: this.stockLevel === 0
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
