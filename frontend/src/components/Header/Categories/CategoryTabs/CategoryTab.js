import React, {Component} from "react";
import classes from './CategoryTab.css';

class CategoryTab extends Component{
    render(
    ){
        return(<div
                    id={this.props.id}
                    className={this.props.active ? 'active' : undefined}
                    onClick={this.props.clicked}
                >
                    {this.props.name}
                </div>)
    }
}
export default CategoryTab;