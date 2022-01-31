import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Datatable } from '../components';
import { addToBasket, removeFromBasket, requestProductList } from '../actions';
import { routes } from '../constants'; 

export default function ProductList(props) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    
    useEffect(() => {
        dispatch(requestProductList());
    }, []);

    const headers1 = [
        { key: "product_name", label: "PRODUCT NAME" },
        { key: "product_description", label: "PRODUCT_DESCRIPTION" },
        { key: "product_price", label: "PRODUCT_PRICE" },
        { key: "add_to_basket", label: "" },
        { key: "remove_from_basket", label: "" }
    ];

    const handleAddToBasket = (data) => {
        dispatch(addToBasket(data));
    };

    const handleRemoveFromBasket = (data) => {
        dispatch(removeFromBasket(data));
    };

    const getCellContent = (key, data) => {
        switch(key) {
            case "product_name":
            case "product_description":
                return data[key];
            case "product_price":
                return "£" + data[key];
            case "add_to_basket": {
                return (
                    <div onClick={() => handleAddToBasket(data)} className={`btn btn-secondary text-right`}>
                        Add to basket
                    </div>
                );
            }

            case "remove_from_basket":
                return (
                    <div onClick={() => handleRemoveFromBasket(data)} className="btn btn-danger text-right">
                        Remove from Basket
                    </div>
                );
            default:
                return null;
        }
    };

    const handleProceedToCheckout = () => {
        props.history.push(routes.checkout);
    };

    if (products.loading) {
        return (
            <div className="container--loader">
                Loading...
            </div>
        );
    }

    return (
        <div className="container--product_list">
            <Datatable showHeaders={false} headers={headers1} getCellContent={getCellContent} cellContents={products.products}/>
            <div className="product_list--footer">
                <div onClick={handleProceedToCheckout}  className="btn btn-primary">
                    Proceed to checkout
                </div>
            </div>
        </div>
    );
}