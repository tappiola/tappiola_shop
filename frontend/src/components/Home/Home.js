import React, {Component} from "react";
import DesignersList from "../DesignersList/DesignersList";
import {NavLink} from 'react-router-dom';
import {STATICS_URL} from "../../constants";
import classes from './Home.module.css';

class Home extends Component {

    render() {
        return (<div className={classes.home}>
            <div className={`${classes.banner} ${classes.banner1}`}>
                <NavLink to='/category/1/product/18'>
                    <img src={`${STATICS_URL}/home/home1.jpg`} alt="banner1"/>
                </NavLink>
                <NavLink to='/category/1/product/18'>
                    <img src={`${STATICS_URL}/home/home2.jpg`} alt="banner2"/>
                </NavLink>
                <NavLink to='/category/1/product/18'>
                    <img src={`${STATICS_URL}/home/home3.jpg`} alt="banner3"/>
                </NavLink>
            </div>
            <div className={classes.bannerLabel}>Cut from luxe lightweight fabrics in a neutral palette, these softly
                structured pieces from our & Other Stories are tailored for sun-soaked city days.
            </div>
            <div className={`${classes.banner} ${classes.banner2}`}>
                <NavLink to='/category/3/product/23'>
                    <img src={`${STATICS_URL}/home/home4.jpg`} alt="banner4"/>
                </NavLink>
                <NavLink to='/category/3/product/23'>
                    <img src={`${STATICS_URL}/home/home5.jpg`} alt="banner5"/>
                </NavLink>
            </div>
            <div className={classes.brandsLabel}>Build your capsule wardrobe. Select timeless pieces by the best European
                designers
            </div>
            <DesignersList/>
        </div>)
    }

}

export default Home;
