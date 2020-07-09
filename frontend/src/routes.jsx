import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import Store from './pages/Store'
import Product from './pages/Product'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Store} path="/stores" exact />
            <Route component={Product} path="/products" exact />
        </BrowserRouter>
    );
}

export default Routes;