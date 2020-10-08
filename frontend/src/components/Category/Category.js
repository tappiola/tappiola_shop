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

    getProducts(id, searchParam = null) {
        this.setState({loading: true});

        if (id === 'search_results') {
            getProducts({search: searchParam})
                .then(({data}) => {
                this.setState({
                    categoryId: id,
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({error: "No products found"})
                }
            }).catch(error => this.setState({loading: false, error: error.message}));
        } else if (id === 'sale') {
            getSaleItems()
                .then(({data}) => {
                this.setState({
                    categoryId: id,
                    products: data,
                    loading: false
                })
                if (data.length === 0) {
                    this.setState({error: "No products in this category"});
                }
            }).catch(error => this.setState({loading: false, error: error.message}));
        } else {
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
        if (this.state.loading) {
            return <Spinner/>
        }

        if (this.state.error){
            return <Error>{this.state.error}</Error>
        }

        return <div className={classes.category}>
                {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
            </div>;

    }

}

export default Category;
