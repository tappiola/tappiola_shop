import React, {Component} from "react";
import classes from './DesignersPopup.module.css';
import {withRouter} from "react-router-dom";

class DesignersPopup extends Component {

    designerLinkClickHandler(id) {
        this.props.history.push(`/designers/${id}`);
    }

    render() {
        if (this.props.isLoading) {
            return null
        }

        return (
            <div className={classes.categoryPopup}>
                <ul>
                    {this.props.data
                        .sort((a, b) => a.name.localeCompare(b.name))
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
