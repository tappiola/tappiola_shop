import React, {Component} from "react";
import {getBrand, getBrandProducts} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import './DesignerCategory.css';
import queryString from 'query-string';
import Spinner from "react-bootstrap/Spinner";

class DesignerCategory extends Component {
    state = {
        designerId: this.props.match.params.id,
        designerData: {},
        products: [],
        searchTerm: ''
    }

    getProducts(id) {

        return getBrandProducts(id).then(({data}) => {
            this.setState({
                designerId: id,
                products: data
            })
        })
    }

    getBrandInfo(id) {
        return getBrand(id).then(({data}) => {
            this.setState({designerData: data})
        });
    }

    getAllData(id) {
        this.setState({loading: true});

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

    componentWillReceiveProps(nextProps, nextValue) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            const id = nextProps.match.params.id;
            this.getAllData(id);
        }
    }

    render() {
        let data = <div>
            <div className='designer-info'>
                <div className='designer-header'>
                    <div className='designer-logo'
                         style={{backgroundImage: `url(${this.state.designerData.image_link})`}}/>
                </div>

                <div className="designer-desc">{this.state.designerData.description}</div>
            </div>

            <div className="category">
                {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
            </div>
        </div>

        if (this.state.loading) {
            data = <Spinner className="spinner" animation="border" variant="secondary"/>
        }

        return (data)
    }

}

export default DesignerCategory;
