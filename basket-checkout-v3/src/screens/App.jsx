import React, { useEffect, useMemo } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutView from './CheckoutView';
import ProductList from './ProductList';
import { Header, Success } from '../components'; 
import { getTotalBasketItems, getTotalPriceOfBasketItems } from '../reducers/products';
import { routes } from '../constants';

export default function App(props) {
    const products = useSelector(stae => stae.products);

    const totalItems = useMemo(() => {
        return getTotalBasketItems(products);
    }, [products]);

    const totalPrice = useMemo(() => {
        return getTotalPriceOfBasketItems(products);
    }, [products]);

    return (
        <div className="App--container">
            <Header basketItem={totalItems} totalPrice={totalPrice} />
            <BrowserRouter>
                <Route exact path={routes.home} component={ProductList} />
                <Route exact path={routes.checkout} component={CheckoutView} />
                <Route exact path={routes.products} component={ProductList} />
                <Route exact path={routes.success} component={Success} />
            </BrowserRouter>
        </div>
    );
}
