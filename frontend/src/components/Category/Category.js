import React, {Component} from "react";
import {getCategoryProducts, getProducts, getSaleItems} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import classes from './Category.module.css';
import queryString from 'query-string';
import {SpinnerCustom as Spinner} from '../../containers/Spinner/Spinner';
import {Error} from "../../containers/Error/Error";

class Category extends Component {
    state = {
        categoryId: this.props.match.params.id,
        products: [],
        searchTerm: '',
        error: null
    }

    getSearchResults = searchParam => {
        getProducts({search: searchParam})
            .then(({data}) => {
                this.setState({
                    categoryId: 'search_results',
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({error: "No products found"})
                }
            }).catch(error => this.setState({loading: false, error: error.message}));
    }

    getSaleProducts = () => {
        getSaleItems()
            .then(({data}) => {
                this.setState({
                    categoryId: 'sale',
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({error: "No products in this category"});
                }
            }).catch(error => this.setState({loading: false, error: error.message}));
    }

    getCategoryProducts = id => {
        getCategoryProducts(id).then(({data}) => {
            this.setState({
                categoryId: id,
                products: data,
                loading: false
            })
            if (data.length === 0) {
                this.setState({error: "No products in this category"});
            }
        }).catch(error => this.setState({loading: false, error: error.message}));
    }

    getProducts(id, searchParam = null) {
        this.setState({loading: true, error: null});

        switch (id) {
            case('search_results'):
                this.getSearchResults(searchParam);
                break;
            case('sale'):
                this.getSaleProducts();
                break;
            default:
                this.getCategoryProducts(id);
        }
    }

    componentDidMount() {
        const searchParam = this.props.location.search;
        const param = queryString.parse(searchParam).search;
        this.setState({searchTerm: param});
        this.getProducts(this.props.match.params.id, param);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id
            || prevProps.location.search !== this.props.location.search
        ) {
            const id = this.props.match.params.id;
            const searchParam = queryString.parse(this.props.history.location.search).search;
            this.setState({searchTerm: searchParam});
            this.getProducts(id, searchParam);
        }
    }

    render() {
        if (this.state.loading) {
            return <Spinner/>
        }

        if (this.state.error) {
            return <Error>{this.state.error}</Error>
        }

        return <div className={classes.category}>
            {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
        </div>;
    }
}

export default Category;
