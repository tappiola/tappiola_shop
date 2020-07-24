import React, {Component} from "react";
import {getCategoryProducts, getProducts, getSaleItems} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import './Category.css';
import queryString from 'query-string';
import Spinner from 'react-bootstrap/Spinner';

class Category extends Component {
    state = {
        categoryId: this.props.match.params.id,
        products: [],
        searchTerm: '',
        message: null
    }

    getProducts(id, searchParam = null) {
        this.setState({loading: true});

        if (id === 'search_results') {
            getProducts({search: searchParam}).then(({data}) => {
                this.setState({
                    categoryId: id,
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({message: "No products found"})
                }
            });
        } else if (id === 'sale') {
            getSaleItems().then(({data}) => {
                this.setState({
                    categoryId: id,
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({message: "No products in this category"});
                }
            })
        } else {
            getCategoryProducts(id).then(({data}) => {
                this.setState({
                    categoryId: id,
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({message: "No products in this category"});
                }
            })
        }
    }

    componentDidMount() {
        const searchParam = this.props.location.search;
        const param = queryString.parse(searchParam).search;
        this.setState({searchTerm: param});
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
        let productsData;

        if (this.state.products.length > 0) {
            productsData = <div className="category">
                {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
            </div>;
        } else {
            productsData = <div className="error">{this.state.message}</div>
        }

        if (this.state.loading) {
            productsData = <Spinner className="spinner" animation="border" variant="secondary"/>
        }
        return (productsData);
    }

}

export default Category;
