import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Datatable } from '../components';
import { removeProductFromList, requestCheckout, setCardNumber, updateQuantity } from '../actions'
import { getTotalPriceOfBasketItems, getTotalBasketItems } from '../reducers/products';
import { routes } from '../constants'; 

const headers = [
    { key: "product_name", label: "PRODUCT NAME" },
    { key: "selected_quantity", label: "SELECTED_QUANTIY" },
    { key: "unit_price", label: "UNIT PRICE" },
    { key: "total_price", label: "TOTAL_PRICE" },
    { key: "remove_product", label: "" }
];

export default function Checkout(props) {
    const [errors, setErrors] = useState(null);
    const products= useSelector(state => state.products);
    const dispatch = useDispatch();

    const totalCheckoutAmount = useMemo(() => {
        return getTotalPriceOfBasketItems(products);
    }, [products]);

    const handleRemoveProduct = (data) => {
        dispatch(removeProductFromList(data));
    };

    const handleProceedToCheckout = () => {
        const payload = {
            basket: products.basket.map((i) => ({ sku: i.id, quantity: i.quantity }))
        }
        dispatch(requestCheckout(payload)).then((res) => {
            if ((res.type === "REQUEST_CHECKOUT_SUCCESS" || res.type === "REQUEST_CHECKOUT_FAILED") && !!res.payload.error) {
                setErrors({ error: res.payload.error })
            } else {
                setErrors(null);
                props.history.push(routes.success);
            }
        }).catch(e => setErrors(e));
    };

    const handleContinueShopping = () => {
        props.history.push(routes.products);
    };

    const handleProductQuantityChange = ({ target: { id, value } }) => {
        dispatch(updateQuantity({ id, quantity: value }));
    };

    const getCellContent = (key, data) => {
        const currentBasket = products && products.basket && products.basket.find(i => i.id === data.id);
        const quantity = (currentBasket && currentBasket.quantity) || 0;

        switch(key) {
            case "product_name":
                return data[key];
            case "unit_price":
                return data["product_price"];
            case "total_price":
                return `£${Number.parseFloat(data.product_price * quantity).toFixed(2)}`;
            case "selected_quantity":
                return (
                    <div className="form-group">
                        <select id={data.id} value={quantity} onChange={handleProductQuantityChange} className="form-control">
                            {[...new Array(data.basketLimit + 1).fill(1)].map((_, idx) => (
                                <option key={idx}>{idx}</option>
                            ))}
                        </select>
                    </div>
                );
            case "remove_product":
                return (
                    <div onClick={() => handleRemoveProduct(data)} className="btn btn-danger text-right">
                        Remove All 
                    </div>
                );
            default:
                return null;
        }
    };

    const checkCardNumber = cardNumber => {
        if (isNaN(cardNumber) || cardNumber.length > 16) {
            return false;
        }

        return true;
    };

    const handleCardNumberChange = ({ target: { id, value } }) => {
        if (checkCardNumber(value)) {
            dispatch(setCardNumber(value));
        }
    };

    if (getTotalBasketItems(products) === 0) {
        return (
            <div className="container--checkout_view text-center mt-5 h3 text-danger">
                <div className="">No product selected</div>
                <div onClick={handleContinueShopping} className="btn btn-primary">Continue shopping</div>
            </div>
        );
    }

    return (
        <div className="container--checkout_view">
            <Datatable headers={headers} cellContents={products.products} getCellContent={getCellContent} />
            <div className="d-flex justify-content-end">
                <div className="">Total Price: £{totalCheckoutAmount.toFixed(2)}</div>
            </div>
            <div className="m-auto d-flex justify-content-center">
                <div className="form-group">
                    <label htmlFor="cardNumber">
                        Input your card number:
                    </label>
                    <input value={products.cardNumber} type="text" className="form-control" id="cardNumber" onChange={handleCardNumberChange}/>
                    {errors && (
                        <p className="text-danger">{errors.error}</p>
                    )}
                </div>

            </div>
            <div className="d-flex justify-content-end gap-12">
                <div onClick={handleContinueShopping} className="btn btn-light">Continue shopping</div>
                <div onClick={handleProceedToCheckout} className="btn btn-primary">Checkout</div>
            </div>
        </div>
    );
}
