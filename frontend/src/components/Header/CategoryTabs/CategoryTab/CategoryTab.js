import React, {Component} from "react";
import './CategoryTab.css';

class CategoryTab extends Component {
    state = {
        isHovered: false
    };

    handleMouseHover = () => {
        this.setState({isHovered: !this.state.isHovered})
    }

    render() {
        return (
            <div
                className={this.props.active ? 'category__active' : undefined}
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}
            >
                <div id={this.props.id} className={'category__name'} onClick={this.props.clicked}>
                    {this.props.name}
                </div>
                {this.props.popup && this.props.popupData && this.state.isHovered && this.props.popup}
            </div>
        )
    }
}

export default CategoryTab;
