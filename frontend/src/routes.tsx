import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from "./services/auth";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Library from './pages/Library/index';
import Search from './pages/Search/index';

interface IProps {
    component: any;
    path: string;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
);

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <PrivateRoute path="/library" component={Library} />
                <PrivateRoute path="/search" component={Search} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
