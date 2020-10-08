import {getBrands, getCategories} from '../../../lib/service';
import React, {Component} from "react";
import './CategoryTabs.css';
import CategoryTab from "./CategoryTab/CategoryTab";
import {withRouter} from "react-router-dom";
import DesignersPopup from "./DesignersPopup/DesignersPopup";


class CategoryTabs extends Component {

    categoriesPanel = React.createRef()
    state = {
        categories: [],
        designersData: [],
        activeCategory: null,
        designersLoading: true
    }

    scrollToCategories() {
        if (this.categoriesPanel.current.getBoundingClientRect().top === 0) {
            this.categoriesPanel.current.scrollIntoView()
        }
    }

    categoryClickHandler(event) {
        const id = event.target.id
        this.setState({activeCategory: event.target.id});
        this.props.history.push(`/category/${id}`);
        this.scrollToCategories()
    }

    saleClickHandler() {
        this.setState({activeCategory: 'sale'});
        this.props.history.push(`/category/sale`);
        this.scrollToCategories()
    }

    designersClickHandler() {
        this.setState({activeCategory: 'designers'});
        this.props.history.push(`/designers`);
        this.scrollToCategories();
    }

    componentDidMount() {

        getCategories().then(
            ({data}) => this.setState({categories: data})
        )

        getBrands()
            .then(({data}) => {
                this.setState({designersData: data, designersLoading: false})
            })
    }

    render() {
        const categoriesData = <React.Fragment>
            <CategoryTab
                key="designers"
                id="designers"
                name="Designers"
                active={this.props.location.pathname.startsWith('/designers')}
                clicked={this.designersClickHandler.bind(this)}
                popup={<DesignersPopup data={this.state.designersData} isLoading={this.state.designersLoading}/>}
                popupData={this.state.designersData}
            />
            {this.state.categories.map(c => <CategoryTab
                key={c.id}
                id={c.id}
                name={c.name}
                active={c.id === +this.props.match.params.id && this.props.location.pathname.startsWith('/category')}
                clicked={this.categoryClickHandler.bind(this)}
            />)}
            <CategoryTab
                key="sale"
                id="sale"
                name="Sale"
                active={this.props.location.pathname === '/category/sale'}
                clicked={this.saleClickHandler.bind(this)}
            />
        </React.Fragment>

        return (<React.Fragment>
                <div className="categories" ref={this.categoriesPanel}>{categoriesData}</div>
                {/*<div className="categories-mobile" ref={this.categoriesPanel}>{categoriesData}</div>*/}
            </React.Fragment>
        )
    }

}

export default withRouter(CategoryTabs);
