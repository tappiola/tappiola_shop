import React, {Component} from "react";
import {getBrand, getBrandProducts} from '../../lib/service';
import ProductCard from "../ProductCard/ProductCard";
import './DesignerCategory.css';
import queryString from 'query-string';

class DesignerCategory extends Component {
    state = {
        designerId: this.props.match.params.id,
        designerData: {},
        products: [],
        searchTerm: ''
    }

    getProducts(id) {
        getBrandProducts(id).then(({data}) => {
            this.setState({
                designerId: id,
                products: data
            })
        })
    }

    getBrandInfo(id){
        getBrand(id).then(({data}) => {
            this.setState({designerData: data})
        });
    }


    componentDidMount() {

        this.getBrandInfo(this.state.designerId);
        const searchParam = this.props.location.search;
        const param = queryString.parse(searchParam).search;
        this.setState({searchTerm: param});
        this.getProducts(this.state.designerId);
    }

    componentWillReceiveProps(nextProps, nextValue) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            const id = nextProps.match.params.id;
            this.getProducts(id);
            this.getBrandInfo(id);
        }
    }

    render() {
        return (
            <div>
                <div className='designer-info'>
                <div className='designer-logo'>
                <img
                    src={this.state.designerData.image_link}
                    alt="designer-card"
                /><h1>{this.state.designerData.name}</h1>
                </div>

                <div className="designer-desc">{this.state.designerData.description}</div>
                    </div>
                <div className="category">
                    {this.state.products.map(p => <ProductCard key={p.id} productData={p}/>)}
                </div>
            </div>)
    }

}

export default DesignerCategory;
