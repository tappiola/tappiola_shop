import React, {Component} from "react";
import './Size.css';

class Size extends Component {

    state = {
        classes: ['size'],
    };
    stockLevel = this.props.data.stock_level;

    componentDidMount() {
        if (this.stockLevel === 0) {
            this.setState({classes: [...this.state.classes, 'sold-out']});
        }
    }

    componentWillReceiveProps(nextProps, nextValue){
        if (this.stockLevel > 0
            && nextProps.selectedSize === this.props.data.size
            && !this.state.classes.includes('size-selected')
        ) {
            this.setState({classes: [...this.state.classes, 'size-selected']});
        } else {
            this.setState({classes: this.state.classes.filter(c => c !== 'size-selected')});
        }
    }

    render() {
        return (<div
            className={this.state.classes.join(' ')}
            onClick={this.props.clicked}
        >
            {this.props.data.size}
        </div>)
    }
}

export default Size;
