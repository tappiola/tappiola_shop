import React, {Component} from "react";
import {getBrand, getBrandProducts} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import classes from './DesignerCategory.module.css';
import categoryClasses from '../Category/Category.module.css';
import queryString from 'query-string';
import {SpinnerCustom as Spinner} from '../../containers/Spinner/Spinner';
import {Error} from "../../containers/Error/Error";

class DesignerCategory extends Component {
    state = {
        designerId: this.props.match.params.id,
        designerData: {},
        products: [],
        searchTerm: '',
        error: null
    }

    getProducts(id) {

        return getBrandProducts(id).then(({data}) => {
            this.setState({
                designerId: id,
                products: data
            })
        }).catch(error => this.setState({error: error.message}));
    }

    getBrandInfo(id) {
        return getBrand(id).then(({data}) => {
            this.setState({designerData: data})
        }).catch(error => this.setState({error: error.message}));
    }

    getAllData(id) {
        this.setState({loading: true, error: null});

        Promise.all([
            this.getProducts(id),
            this.getBrandInfo(id)
        ]).then(
            () => this.setState({loading: false})
        )
    }

    componentDidMount() {

        this.getAllData(this.state.designerId);
        const searchParam = this.props.location.search;
        const param = queryString.parse(searchParam).search;
        this.setState({searchTerm: param});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const id = this.props.match.params.id;
            this.getAllData(id);
        }
    }

    render() {
        let data = <div>
            <div className={classes.info}>
                <div className={classes.header}>
                    <div className={classes.logo}
                         style={{backgroundImage: `url(${this.state.designerData.image_link})`}}/>
                </div>

                <div className={classes.desc}>{this.state.designerData.description}</div>
            </div>

            <div className={categoryClasses.category}>
                {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
            </div>
        </div>

        if (this.state.loading) {
            data = <Spinner/>
        }

        if (this.state.error) {
            return <Error>{this.state.error}</Error>
        }

        return data
    }

}

export default DesignerCategory;
