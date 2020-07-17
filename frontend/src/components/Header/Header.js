import React, {Component} from "react";
import MainLogo from "./MainLogo/MainLogo";
import './Header.css';
import {withRouter} from "react-router-dom";
import queryString from 'query-string';

class Header extends Component {
    state = {
        searchTerm: ''
    }

    handleSearchTermSubmit = (event) => {
        event.preventDefault();
        const value = this.textInput.value;
        this.setState({searchTerm: value});
        this.props.history.push(`/category/search_results?search=${value}`);
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

    render() {
        return (
            <div>
                <div className='top-menu-lvl1'>

                    <MainLogo/>
                    <form onSubmit={this.handleSearchTermSubmit}>
                        <input className='search' defaultValue={this.state.searchTerm}
                               ref={input => this.textInput = input}>
                        </input>

                    </form>
                    <div className='main-icons'>
                        <div onClick={this.cartClickHandler}>Cart</div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(Header);
