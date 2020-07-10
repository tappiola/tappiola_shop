import React, {Component} from "react";
import {getBrands} from '../../lib/service';
import DesignerCard from "./DesignerCard/DesignerCard";
import './DesignersList.css';
import {withRouter} from "react-router-dom";

class DesignersList extends Component {
    state = {
        designersData: []
    }

    componentDidMount() {
        getBrands()
            .then(({data}) => {
                this.setState({designersData: data})
            })
    }


    render() {
        return (<div className="brand">
            {this.state.designersData.map(p => <DesignerCard key={p.id} designerData={p}/>)}
        </div>)
    }

}

export default withRouter(DesignersList);
