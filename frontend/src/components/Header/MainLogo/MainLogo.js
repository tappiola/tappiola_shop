import React, {Component} from 'react';
import './MainLogo.css';
import {withRouter} from "react-router-dom";

class MainLogo extends Component {
    render() {
        return (
            <div className='main-logo' onClick={() => this.props.history.push('/')}>
                <img
                    src="https://tappiola-shop.s3.eu-west-2.amazonaws.com/main-logo.png"
                    alt="main-logo"
                />
            </div>
        );
    }
}

export default withRouter(MainLogo);