import { createContext, useContext } from "react";

export const CartContext = createContext({
  cart: [],
  setCart: () => null,
});

export const useCartContext = () => useContext(CartContext);
