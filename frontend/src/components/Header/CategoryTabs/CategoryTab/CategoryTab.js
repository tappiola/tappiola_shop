import React, {Component} from "react";
import classes from './CategoryTab.module.css';

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
                className={this.props.active ? classes.active : ''}
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}
                onClick={() => this.setState(state => ({isClicked: !state.isClicked}))}
            >
                <div id={this.props.id} className={classes.name} onClick={this.props.clicked}>
                    {this.props.name}
                </div>
                {this.state.isHovered && this.props.children}
            </div>
        )
    }
}

export default CategoryTab;
