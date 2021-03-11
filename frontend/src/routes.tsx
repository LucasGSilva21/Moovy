import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Library from './pages/Library/index';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Library} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
