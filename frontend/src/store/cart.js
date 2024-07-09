import axios from "axios";

const CART_ADD_ITEM = "cart/CART_ADD_ITEM";
const CART_REMOVE_ITEM = "cart/CART_REMOVE_ITEM";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
