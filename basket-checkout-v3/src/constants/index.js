export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
    UPDATE_QUANTITY: "UPDATE_QUANTIY",
    REMOVE_PRODUCT: "REMOVE_PRODUCT",
    SET_CARD_NUMBER: "SET_CARD_NUMBER",
    REQUEST_PRODUCT_LIST_SUCCESS: "REQUEST_PRODUCT_LIST_SUCCESS",
    REQUEST_PRODUCT_LIST_FAILED: "REQUEST_PRODUCT_LIST_FAILED",
    REQUEST_PRODUCT_LIST_BEGIN: "REQUEST_PRODUCT_LIST_BEGIN",
    REQUEST_CHECKOUT_BEGIN: "REQUEST_CHECKOUT_BEGIN",
    REQUEST_CHECKOUT_SUCCESS: "REQUEST_CHECKOUT_SUCCESS",
    REQUEST_CHECKOUT_FAILED: "REQUEST_CHECKOUT_FAILED"
};

export const routes = {
    home: "/",
    products: "/app/products",
    checkout: "/app/checkout",
    success: "/app/success"
};

export const api = {
    baseUrl: "http://127.0.0.1:9001",
    products: "/products",
    checkout: "/checkout"
};