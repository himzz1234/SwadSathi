export default function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const index = state.cart.findIndex(
        (item) =>
          item.id == action.payload.id && item.type == action.payload.type
      );

      newCart = [...state.cart];

      if (
        newCart.length &&
        action.payload.cId !== newCart[newCart.length - 1].cId
      ) {
        newCart = [];
      }

      if (index != -1) {
        newCart[index].qty = action.payload.qty;
      } else newCart = [...newCart, action.payload];

      return {
        cart: [...newCart],
      };
    }

    case "REMOVE_ITEM": {
      newItems = [...state.cart];
      const quantity = state.cart.find(
        (item) =>
          item.id == action.payload.id && item.type == action.payload.type
      ).qty;

      if (quantity > 1) {
        newItems = newItems.map((item) =>
          item.id === action.payload.id && item.type == action.payload.type
            ? { ...item, qty: item.qty - 1 }
            : item
        );
      } else {
        const index = state.cart.findIndex(
          (item) =>
            item.id == action.payload.id && item.type == action.payload.type
        );
        newItems.splice(index, 1);
      }

      return {
        cart: [...newItems],
      };
    }

    case "REMOVE_ALL": {
      return {
        cart: [],
      };
    }
  }
}
