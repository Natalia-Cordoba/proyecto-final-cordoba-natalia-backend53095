import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartId, setCartId] = useState(null);

    return (
        <CartContext.Provider value={{ cartId, setCartId }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);