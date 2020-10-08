import React, {Component} from 'react';
import classes from './MainLogo.module.css';
import {withRouter} from "react-router-dom";
import {STATICS_URL} from '../../../constants';

class MainLogo extends Component {
    render() {
        return (
            <div className={classes.mainLogo} onClick={() => this.props.history.push('/')}>
                <img
                    src={`${STATICS_URL}/main-logo.png`}
                    alt="main-logo"
                />
            </div>
        );
    }
}

export default withRouter(MainLogo);
