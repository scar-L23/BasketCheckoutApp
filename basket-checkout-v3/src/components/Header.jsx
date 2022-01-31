import React from 'react';

export default function Header({ basketItem, totalPrice, ...props }) {
    const showTotalPrice = window.location.pathname.includes('/checkout');
    return (
        <div className="header--container">
            <div className="header--wrapper">
                <div className="">
                    Basket Items: {basketItem}
                </div>
                {!showTotalPrice && (
                    <div className="">
                        Total Price: £{totalPrice.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
}

Header.defaultProps = {
    basketItem: 0,
    totalPrice: null
}