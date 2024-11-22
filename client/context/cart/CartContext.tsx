import { createContext, ReactNode, useReducer } from "react";
import CartReducer from "./CartReducer";

const INITIAL_STATE = {
  cart: [],
};

export const CartContext = createContext(INITIAL_STATE);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
