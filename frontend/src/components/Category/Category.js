import React, {Component} from "react";
import {getCategoryProducts} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import './Category.css';

class Category extends Component{
    state = {
        categoryId: this.props.match.params.id,
        products: []
    }

    getProducts(id) {
        getCategoryProducts(parseInt(id))
            .then(({data}) => {
                this.setState({categoryId: id, products: data})
            })
    }

    componentDidMount() {
        this.getProducts(this.props.match.params.id);
        console.log(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps, nextValue) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id;
      this.getProducts( id );
    }
  }

    render() {
        return (<div className="category">
            {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
        </div>)
    }

}

export default Category;