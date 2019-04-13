import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Signup from './auth/Signup';
import Protected from './Protected';
import Signout from './auth/Signout';
import Signin from './auth/Signin';
import Profile from "../components/Profile/ProfileBar";
import GamesLobby from "../components/lobby/gamesLobby/lobby";
import "./styles/App.css";
import GameContainer from '../pages/GameContainer';
import Room from './Room';
import "./styles/App.css";

class App extends Component {
    componentDidMount = () => {
        let token = localStorage.getItem('token');
        if (!token || token === '') {//if there is no token, dont bother
            return;
        }
        // fetch user from token (if server deems it's valid token)
        this.props.getCurrentUser(token, (response) => {
            console.log(response);
        });

        // fetch games
        this.props.getAllGames((response) => {
            const games = response.data.games;
            console.log('these should be all the games currently in db:');
            console.log(games);
        });
    }

    render() {
        return (
            <div className="site">
                <div className="site-content">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/protected" component={Protected} />
                        <Route path="/signout" component={Signout} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/lobby" component={GamesLobby} />
                        <Route path="/room/:gameId" component={Room} />
                        <Route path='/game' component={GameContainer} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

// export default App;
function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions)
)(App);