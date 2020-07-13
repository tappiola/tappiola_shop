import React, {Component} from "react";
import './DesignerCard.css';
import {withRouter} from "react-router-dom";

class ProductCard extends Component {

    designerClickHandler = (id) => {
        this.props.history.push(`/designers/${id}`)
    }

    render() {
        return (
            <div className="designer-card"
                 onClick={this.designerClickHandler.bind(this, this.props.designerData.id)}
                 id={this.props.designerData.id}
            >
                <div className='image' style={{backgroundImage: `url(${this.props.designerData.image_link})`}}/>
                <div className='title'>
                    {this.props.designerData.name}
                </div>
            </div>)
    }

}

export default withRouter(ProductCard);
