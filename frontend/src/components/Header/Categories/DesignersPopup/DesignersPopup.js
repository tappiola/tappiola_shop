import React, {Component} from "react";
import './DesignersPopup.css';
import {withRouter} from "react-router-dom";

class DesignersPopup extends Component{

    designerLinkClickHandler(id){
        this.props.history.push(`/designers/${id}`);
    }

    render() {
        return(
            <div className='category-popup'>
            <ul>
                {this.props.data
                    .sort((x, y) => x.name - y.name)
                    .map(d =>
                        <li
                            onClick={this.designerLinkClickHandler.bind(this, d.id)}
                            key={d.id} id={d.id}>
                    {d.name}
                </li>)}
            </ul>
                </div>)
    }
}

export default withRouter(DesignersPopup);
