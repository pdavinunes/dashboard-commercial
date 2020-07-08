import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import Store from './pages/Store'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Store} path="/store" exact />
        </BrowserRouter>
    );
}

export default Routes;