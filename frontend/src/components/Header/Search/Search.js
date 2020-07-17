import React, {Component} from "react";
import queryString from 'query-string';
import {withRouter} from "react-router-dom";
import './Search.css';
import SearchIcon from "../../Icons/SearchIcon";

class Search extends Component {
    state = {
        searchTerm: ''
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
        return (
            <div className='header__search'>
                <form name='header-search' onSubmit={this.handleSearchTermSubmit}>
                    <input className='search-input'
                           defaultValue={this.state.searchTerm}
                           ref={input => this.textInput = input}
                           placeholder="Search"
                    />
                    <button className='search-button'>
                        <SearchIcon/>
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(Search);
