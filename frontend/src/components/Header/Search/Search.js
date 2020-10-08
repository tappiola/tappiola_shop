import React, {Component} from "react";
import queryString from 'query-string';
import {withRouter} from "react-router-dom";
import classes from './Search.module.css';
import SearchIcon from "../../Icons/SearchIcon";
import clsx from 'clsx';

class Search extends Component {
    state = {
        inputValue: '',
        isInputFocused: false
    }

    handleSearchTermSubmit = (event) => {
        event.preventDefault();
        this.props.history.push(`/category/search_results?search=${this.state.inputValue}`);
    }

    inputClickHandler = () => {
        this.setState({isInputFocused: true});
    }

    inputLeaveHandler = () => {
        this.setState({isInputFocused: false});
    }

    inputChangeHandler = (event) => {
        this.setState({inputValue: event.target.value});
    }

    clearValueHandler = () => {
        this.setState({inputValue: ''});
    }

    componentDidMount() {
        this.setState({inputValue: queryString.parse(this.props.location.search).search || ''});
    }

    componentWillReceiveProps(nextProps, nextValue) {
        if (!nextProps.history.location.search) {
            this.setState({inputValue: ''});
        }
    }

    render() {
        return (
            <div className={classes.headerSearchContainer}>
                <div className={clsx(classes.headerSearchDiv, {[classes.extended]: this.state.isInputFocused})}>
                    <form onSubmit={this.handleSearchTermSubmit}>
                        <input className={classes.searchInput}
                               placeholder="Search"
                               onChange={this.inputChangeHandler}
                               onFocus={this.inputClickHandler}
                               onBlur={this.inputLeaveHandler}
                               value={this.state.inputValue}
                        />
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <div className={clsx(classes.closeIcon, {[classes.hidden]: !this.state.inputValue})}
                             onClick={this.clearValueHandler}>
                            <i className="fa fa-times" aria-hidden="true"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Search);
