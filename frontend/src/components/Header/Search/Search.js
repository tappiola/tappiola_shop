import React, {Component} from "react";
import queryString from 'query-string';
import {withRouter} from "react-router-dom";

class Search extends Component {
    state = {
        searchTerm: ''
    }

    cartClickHandler = () => {
        this.props.history.push('/cart');
    }

    componentDidMount() {
        this.setState({searchTerm: queryString.parse(this.props.location.search).search})
    }

    componentWillReceiveProps(nextProps, nextValue) {
        if (!nextProps.history.location.search) {
            this.setState({searchTerm: ''});
            this.textInput.value = '';

        }
    }

    handleSearchTermSubmit = (event) => {
        event.preventDefault();
        const value = this.textInput.value;
        this.setState({searchTerm: value});
        this.props.history.push(`/category/search_results?search=${value}`);
    }

    render() {
        return (<form onSubmit={this.handleSearchTermSubmit}>
            <input className='search' defaultValue={this.state.searchTerm}
                   ref={input => this.textInput = input}>
            </input>

        </form>)
    }
}

export default withRouter(Search);
