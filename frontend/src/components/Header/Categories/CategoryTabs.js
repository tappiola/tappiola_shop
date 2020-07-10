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

     onClickTabItem(event){
        const id = event.target.id
    this.setState({ activeCategory: event.target.id});
    this.props.history.push(`/category/${id}`);
    if (this.categoriesPanel.current.getBoundingClientRect().top === 0){
        this.categoriesPanel.current.scrollIntoView()
    }
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
                {this.state.categories.map(c => <CategoryTab
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    active={c.id === +this.state.activeCategory || c.id === +this.props.match.params.id}
                    clicked={this.onClickTabItem.bind(this)}
                />)}
            </div>
        )
    }

}

export default withRouter(CategoryTabs);
