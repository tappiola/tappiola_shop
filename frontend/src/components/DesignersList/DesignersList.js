import React, {Component} from "react";
import {getBrands} from '../../lib/service';
import DesignerCard from "./DesignerCard";
import classes from './DesignersList.module.css';
import {SpinnerCustom as Spinner} from "../../containers/Spinner/Spinner";
import {Error} from "../../containers/Error/Error";

class DesignersList extends Component {
    state = {
        designersData: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        this.setState({error: null});
        getBrands()
            .then(({data}) => this.setState({designersData: data}))
            .catch(error => this.setState({error: error.message}))
            .finally(() => this.setState({loading: false}));
    }


    render() {

        if (this.state.loading && !this.props.isFooter) {
            return <Spinner/>
        }

        if (this.state.error) {
            return <Error>{this.state.error}</Error>
        }

        return (<div className={classes.brand}>
            {this.state.designersData.map(p => <DesignerCard key={p.id} designerData={p}/>)}
        </div>)
    }

}

export default DesignersList;
