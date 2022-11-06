import { ADD_TO_CART, REMOVE_CART_ITEMS } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      // Check if item is exist
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    default:
      break;
  }
};
