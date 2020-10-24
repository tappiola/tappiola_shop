import React, {Component} from "react";
import classes from './DesignerCard.module.css';
import {withRouter} from "react-router-dom";

class ProductCard extends Component {

    designerClickHandler = (id) => {
        this.props.history.push(`/designers/${id}`)
    }

    render() {
        return (
            <div className={classes.card}
                 onClick={this.designerClickHandler.bind(this, this.props.designerData.id)}
                 id={this.props.designerData.id}
            >
                <div className={classes.image} style={{backgroundImage: `url(${this.props.designerData.image_link})`}}/>
                <div className={classes.title}>
                    {this.props.designerData.name}
                </div>
            </div>)
    }
}

export default withRouter(ProductCard);
