import { actionTypes, api } from '../constants';
import reducer from '../reducers';

export const addToBasket = (payload) => ({ type: actionTypes.ADD_TO_BASKET, payload });

export const removeFromBasket = (payload) => ({ type: actionTypes.REMOVE_FROM_BASKET, payload });

export const removeProductFromList = (payload) => ({ type: actionTypes.REMOVE_PRODUCT, payload });

export const updateQuantity = (payload) => ({ type: actionTypes.UPDATE_QUANTITY, payload });

export const setCardNumber = (payload) => ({ type: actionTypes.SET_CARD_NUMBER, payload });

export const requestProductList = () => {
    const success = (payload) => ({ type: actionTypes.REQUEST_PRODUCT_LIST_SUCCESS, payload });
    const failed = (errors) => ({ type: actionTypes.REQUEST_PRODUCT_LIST_FAILED, errors });
    const begin = () => ({ type: actionTypes.REQUEST_PRODUCT_LIST_BEGIN });
    return (dispatch) => {
        dispatch(begin());
        return fetch(api.baseUrl + api.products)
            .then(res => res.json())
            .then(json => dispatch(success(json)))
            .catch(errors => dispatch(failed(errors)));
    }
}

export const requestCheckout = (payload) => {
    const success = (payload) => ({ type: actionTypes.REQUEST_CHECKOUT_SUCCESS, payload });
    const failed = (errors) => ({ type: actionTypes.REQUEST_CHECKOUT_FAILED, errors });
    const begin = () => ({ type: actionTypes.REQUEST_CHECKOUT_BEGIN });

    return (dispatch, getState) => {
        dispatch(begin());
        return fetch(api.baseUrl + api.checkout, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ basket: payload.basket, cardNumber: getState().products.cardNumber })
        })
            .then(res => res.json())
            .then(json => dispatch(success(json)))
            .catch(errors => dispatch(failed(errors)));
    }
}