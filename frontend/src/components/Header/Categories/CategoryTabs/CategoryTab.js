import React, {Component} from "react";
import './CategoryTab.css';

class CategoryTab extends Component {
    state = {
        isHovered: false,
    };

    handleMouseHover = () => {
        this.setState({isHovered: !this.state.isHovered})
    }

    render() {
        return (
            <div
                className={this.props.active ? 'active' : undefined}
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}
            >
                <div id={this.props.id} className={'category-name'} onClick={this.props.clicked}>
                    {this.props.name}
                </div>

                {
                    this.props.popup &&
                    this.state.isHovered &&
                        <div className={'category-popup'}>
                            {this.props.popup}
                        </div>
                }
            </div>
        )
    }
}

export default CategoryTab;
