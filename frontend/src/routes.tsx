import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Library from './pages/Library/index';
import Search from './pages/Search/index';

function Routes(){
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Library} />
                <Route exact path="/search" component={Search} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
