import React, {Component} from "react";
import {getBrands} from '../../lib/service';
import DesignerCard from "./DesignerCard";
import classes from './DesignersList.module.css';

class DesignersList extends Component {
    state = {
        designersData: [],
        error: null
    }

    componentDidMount() {
        this.setState({error: null});
        getBrands()
            .then(({data}) => this.setState({designersData: data}))
            .catch(error => this.setState({error: error.message}));
    }


    render() {
        return (<div className={classes.brand}>
            {this.state.designersData.map(p => <DesignerCard key={p.id} designerData={p}/>)}
        </div>)
    }

}

export default DesignersList;
