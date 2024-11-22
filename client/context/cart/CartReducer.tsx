export default function CartReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { id, type, qty, cId } = action.payload;

      const index = state.cart.findIndex(
        (item: any) => item.id === id && item.type === type
      );
      let newCart = [...state.cart];

      if (newCart.length && cId !== newCart[newCart.length - 1].cId) {
        newCart = [];
      }

      if (index != -1) {
        newCart[index] = {
          ...newCart[index],
          qty: newCart[index].qty + qty,
        };
      } else {
        newCart = [...newCart, action.payload];
      }

      return {
        cart: newCart,
      };
    }

    case "REMOVE_ITEM": {
      let newItems = [...state.cart];
      const index = newItems.findIndex(
        (item: any) =>
          item.id === action.payload.id && item.type === action.payload.type
      );

      if (index == -1) return;
      const quantity = newItems[index].qty;

      if (quantity > 1) {
        newItems[index] = {
          ...newItems[index],
          qty: newItems[index].qty - 1,
        };
      } else newItems.splice(index, 1);

      return {
        cart: [...newItems],
      };
    }

    case "DELETE_ITEM": {
      const newItems = [...state.cart];
      const index = newItems.findIndex(
        (item: any) =>
          item.id === action.payload.id && item.type === action.payload.type
      );

      if (index === -1) return state; // Return current state if item not found

      // Remove the item at the found index
      newItems.splice(index, 1);

      return {
        cart: newItems,
      };
    }

    default: {
      console.log("hdwdw");
      return {
        cart: [],
      };
    }
  }
}
