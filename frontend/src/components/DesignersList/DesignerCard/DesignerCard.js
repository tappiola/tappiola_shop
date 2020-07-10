import React, {Component} from "react";
import './DesignerCard.css';

class ProductCard extends Component {

    render() {
        return (
            <div className="designer-card">
                <img
                    src={this.props.designerData.image_link}
                    alt="designer-card"
                />
                <div>{this.props.designerData.name}</div>
                <div>{this.props.designerData.description}</div>
            </div>)
    }

}

export default ProductCard;
