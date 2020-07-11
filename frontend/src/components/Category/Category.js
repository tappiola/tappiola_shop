import React, {Component} from "react";
import {getCategoryProducts, getProducts, getSaleItems} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import './Category.css';
import queryString from 'query-string';

class Category extends Component {
    state = {
        categoryId: this.props.match.params.id,
        products: [],
        searchTerm: ''
    }

    getProducts(id, searchParam = null) {
        if (id === 'search_results') {
            getProducts(searchParam).then(({data}) => {
                this.setState({
                    categoryId: id,
                    products: data
                })
            });
        } else if (id === 'sale') {
            getSaleItems().then(({data}) => {
                this.setState({categoryId: id, products: data})
            })
        } else {
            getCategoryProducts(id).then(({data}) => {
                this.setState({categoryId: id, products: data})
            })
        }
    }

    componentDidMount() {
        const searchParam = this.props.location.search;
        const param = queryString.parse(searchParam).search;
        this.setState({searchTerm: param});
        console.log('search mount ' + param);
        this.getProducts(this.props.match.params.id, param);
    }

    componentWillReceiveProps(nextProps, nextValue) {
        if (nextProps.match.params.id !== this.props.match.params.id
            || nextProps.history.location.search !== this.props.location.search) {
            const id = nextProps.match.params.id;
            const searchParam = queryString.parse(nextProps.history.location.search).search;
            this.setState({searchTerm: searchParam});
            this.getProducts(id, searchParam);
        }
    }

    render() {
        return (<div className="category">
            {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
        </div>)
    }

}

export default Category;
