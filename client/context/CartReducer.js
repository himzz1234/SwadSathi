export default function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        cart: [...state.cart, action.payload],
      };
    }

    case "REMOVE_ITEM": {
      const newItems = [...state.cart];

      const index = state.cart.findIndex((item) => item.id == action.payload);
      newItems.slice(index, 1);

      return {
        cart: newItems,
      };
    }
  }
}
