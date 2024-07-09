import axios from "axios";

const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";

const loadProducts = (data) => ({
  type: LOAD_PRODUCTS,
  payload: data,
});

export const thunkLoadProducts = () => async (dispatch) => {
  const { data } = await axios.get("/api/products");

  await dispatch(loadProducts(data));
  return data;
};

const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const newState = { ...state };
      newState.products = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default productReducer;
