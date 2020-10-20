import React from 'react';
import { isAuthenticated } from './services/auth';
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )}/>
)

const Routes = () => (
    <BrowserRouter history={hist}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <PrivateRoute path="/admin" component={Admin} />
        </Switch>
    </BrowserRouter>
);

export default Routes;