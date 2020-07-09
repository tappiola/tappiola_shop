import React, {Component} from "react";
import './styles.css';
import BannerOption from "./banner-option";

class Banner extends Component {
    state = {
        bannerIndex: 0
    }

    bannerOptions = [
        <BannerOption boldText="We said, ’The change starts with us.’"
                      normalText="We remain dedicated to this."
                      linkText="Here are the things we've committed to so far."/>,
        <BannerOption boldText="Want to shop more sustainably?"
                      linkText="Try our fashion footprint tool."/>
    ];

    changeBannerText() {
        console.log(this.state);
        let currentIndex = this.state.bannerIndex;
        currentIndex < this.bannerOptions.length - 1 ? currentIndex += 1 : currentIndex = 0;
        this.setState({bannerIndex: currentIndex});
        // setTimeout(this.changeBannerText.bind(this), 3000);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.changeBannerText(), 10000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {

        return (
            <div className='banner'>
                {this.bannerOptions[this.state.bannerIndex]}
            </div>
        );
    }
}

export default Banner;