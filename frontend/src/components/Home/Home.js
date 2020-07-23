import React, {Component} from "react";
import './Home.css';
import DesignersList from "../DesignersList/DesignersList";
import {withRouter} from 'react-router-dom';

class Home extends Component {

    imageClickHandler = (uri) => {
        this.props.history.push(uri);
    }

    render() {
        return (<div className="home">
            <div className="home__banner" id="banner1">
                <img
                    src="https://tappiola-shop.s3.eu-west-2.amazonaws.com/home/home1.jpg"
                    alt="banner1"
                    onClick={this.imageClickHandler.bind(this, '/category/1/product/18')}
                />
                <img
                    src="https://tappiola-shop.s3.eu-west-2.amazonaws.com/home/home2.jpg"
                    alt="banner2"
                    onClick={this.imageClickHandler.bind(this, '/category/1/product/18')}
                />
                <img
                    src="https://tappiola-shop.s3.eu-west-2.amazonaws.com/home/home3.jpg"
                    alt="banner3"
                    onClick={this.imageClickHandler.bind(this, '/category/1/product/18')}
                />
            </div>
            <div className="home__banner-label">Cut from luxe lightweight fabrics in a neutral palette, these softly
                structured pieces from our & Other Stories are tailored for sun-soaked city days.
            </div>
            <div className="home__banner" id="banner2">
                <img src="https://tappiola-shop.s3.eu-west-2.amazonaws.com/home/home4.jpg" alt="banner4"/>
                <img src="https://tappiola-shop.s3.eu-west-2.amazonaws.com/home/home5.jpg" alt="banner5"/>
            </div>
            <div className="home__brands-label">Build your capsule wardrobe. Select timeless pieces by the best European
                designers
            </div>
            <DesignersList/>
        </div>)
    }

}

export default withRouter(Home);
