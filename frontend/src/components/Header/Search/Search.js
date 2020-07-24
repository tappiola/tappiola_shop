import React, {Component} from "react";
import queryString from 'query-string';
import {withRouter} from "react-router-dom";
import './Search.css';
import SearchIcon from "../../Icons/SearchIcon";

class Search extends Component {
    state = {
        searchTerm: '',
        formClasses: ['header-search__div'],
        inputValue: ''
    }

    handleSearchTermSubmit = (event) => {
        event.preventDefault();
        const value = this.state.inputValue;
        this.setState({searchTerm: value});
        this.props.history.push(`/category/search_results?search=${value}`);
    }

    inputClickHandler = () => {
        this.setState({formClasses: [...this.state.formClasses, "extended"]});
    }

    inputLeaveHandler = () => {
        this.setState({formClasses: this.state.formClasses.filter(x => x !== "extended")});
    }

    inputChangeHanlder = (event) =>{
        this.setState({inputValue: event.target.value});
    }

    clearValueHandler = (event) => {
        this.setState({searchTerm: '', inputValue: ''});
    }

    componentDidMount() {
        this.setState({searchTerm: queryString.parse(this.props.location.search).search});
    }

    componentWillReceiveProps(nextProps, nextValue) {
        if (!nextProps.history.location.search) {
            this.setState({searchTerm: '', inputValue: ''});
        }
    }

    render() {
        return (
            <div className='header-search__container'>
                <div className={this.state.formClasses.join(' ')}>
                    <form name='header-search__form' onSubmit={this.handleSearchTermSubmit}>
                        <input className="search-input"
                               defaultValue={this.state.searchTerm}
                               placeholder="Search"
                               onChange={this.inputChangeHanlder}
                               onFocus={this.inputClickHandler}
                               onBlur={this.inputLeaveHandler}
                        />
                        <div className='search-icon'>
                            <SearchIcon/>
                        </div>
                        <div className={`close-icon ${this.state.inputValue === '' && 'hidden'}`} onClick={this.clearValueHandler}>
                            <i className="fa fa-times" aria-hidden="true"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Search);
