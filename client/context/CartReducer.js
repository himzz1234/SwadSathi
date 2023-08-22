export default function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const findIndex = state.cart.findIndex(
        (item) => item.id == action.payload.id
      );

      newCart = [...state.cart];
      if (
        newCart.length &&
        action.payload.cId !== newCart[newCart.length - 1].cId
      ) {
        newCart = [];
      }

      if (findIndex != -1) {
        newCart = newCart.map((item) =>
          item.id == action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        newCart = [...newCart, action.payload];
      }

      return {
        cart: [...newCart],
      };
    }

    case "REMOVE_ITEM": {
      newItems = [...state.cart];
      const quantity = state.cart.find((item) => item.id == action.payload).qty;

      if (quantity > 1) {
        newItems = newItems.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
        );
      } else {
        const index = state.cart.findIndex((item) => item.id == action.payload);
        newItems.splice(index, 1);
      }

      return {
        cart: [...newItems],
      };
    }
  }
}
