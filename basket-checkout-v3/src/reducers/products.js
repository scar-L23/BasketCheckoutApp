import { actionTypes } from '../constants';

const initalState = {
    basket: [],
    productsList: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    cardNumber: ""
};

export const getTotalBasketItems = (state) => {
    return state && state.basket && state.basket.reduce((acc, i) => acc + i.quantity, 0);
};

export const getTotalPriceOfBasketItems = (state) => {
    return state && state.basket && state.basket.reduce((acc, curr) => acc + (curr.unit_price * curr.quantity), 0);
};

const addItemToBasket = (state, payload) => {
    const arr = [...state.basket];
    const item  = { id: payload.id, quantity: 1, unit_price: payload.product_price };

    if (arr.length === 0) {
        return [item];
    }

    const foundItem = arr.find(i => i.id === payload.id);

    if (foundItem) {
        return arr.map((i) => i.id === foundItem.id ? ({ ...foundItem, quantity: foundItem.quantity < payload.basketLimit ? i.quantity + 1 : payload.basketLimit }) : i);
    }

    arr.push(item);
    return arr;
}

const removeQuantityFromBasket = (state, payload) => {
    if (state.basket.length === 0) {
        return state.basket;
    }

    return state.basket.map((i) => i.id === payload.id ? ({ ...i, quantity: i.quantity - 1 }) : i)
}

const removeItemFromBasket = (state, payload) => {
    return state.basket.filter(i => i.id !== payload.id);   
};

const removeProductFromList = (state, payload) => {
    return state.products.filter(i => i.id !== payload.id);
}

const updateQuantityInBasket = (state, payload) => {
    return state.basket.map((i) => payload.id === i.id ? ({
        ...i,
        quantity: payload.quantity
    }) : i);
};

const formatProductList = (payload) => {
    return payload.map((i, idx) => ({
        ...i,
        id: i.sku,
        product_name: i.name,
        product_description: i.description,
        product_price: i.price,
    }))
};

export default function Products (state = initalState, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_BASKET:
            return {
                ...state,
                basket: addItemToBasket(state, action.payload)
            };
        case actionTypes.REMOVE_FROM_BASKET:
            return {
                ...state,
                basket: removeQuantityFromBasket(state, action.payload)
            };
        case actionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                basket: removeItemFromBasket(state, action.payload),
                products: removeProductFromList(state, action.payload)
            };
        case actionTypes.SET_CARD_NUMBER:
            return {
                ...state,
                cardNumber: action.payload
            };
        case actionTypes.UPDATE_QUANTITY:
            return {
                ...state,
                basket: updateQuantityInBasket(state,action.payload)
            };
        case actionTypes.REQUEST_PRODUCT_LIST_BEGIN:
            return {
                ...state,
                loading: true
            };
        case actionTypes.REQUEST_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: formatProductList(action.payload),
            };
        case actionTypes.REQUEST_PRODUCT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };
        default: {
            return state;
        }
    }
}
