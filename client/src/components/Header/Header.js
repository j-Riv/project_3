import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {

    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div>
                    <Link to="/lobby">Lobby</Link>
                    <Link to="/signout">Sign Out</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="header">
                <Link to="/" className="logo"><img src="/images/jester-color-logo.png" alt="Jester" /></Link>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);