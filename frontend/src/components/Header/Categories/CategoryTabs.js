import {getCategories} from '../../../lib/service';
import React, {Component} from "react";
import './CategoryTabs.css';
import CategoryTab from "./CategoryTabs/CategoryTab";
import {withRouter} from "react-router-dom";


class CategoryTabs extends Component {

    categoriesPanel = React.createRef()
    state = {
        categories: [],
        activeCategory: null
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
        this.props.history.push(`/sale`);
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
        console.log('panda' + this.props.match.params.id)
    }


    render() {
        return (
            <div className="categories" ref={this.categoriesPanel}>
                <CategoryTab
                    key="designers"
                    id="designers"
                    name="Designers"
                    active={this.props.location.pathname === '/designers'}
                    clicked={this.designersClickHandler.bind(this)}
                />
                {this.state.categories.map(c => <CategoryTab
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    active={c.id === +this.state.activeCategory || c.id === +this.props.match.params.id}
                    clicked={this.categoryClickHandler.bind(this)}
                />)}
                <CategoryTab
                    key="sale"
                    id="sale"
                    name="Sale"
                    active={this.state.activeCategory === 'sale' || this.props.location.pathname === '/sale'}
                    clicked={this.saleClickHandler.bind(this)}
                />
            </div>
        )
    }

}

export default withRouter(CategoryTabs);
