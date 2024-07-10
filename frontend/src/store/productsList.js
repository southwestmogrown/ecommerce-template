import axios from "axios";

const PRODUCT_LIST_REQUEST = "products/PRODUCT_LIST_REQUEST";
const PRODUCT_LIST_SUCCESS = "products/PRODUCT_LIST_SUCCESS";
const PRODUCT_LIST_FAIL = "products/PRODUCT_LIST_FAIL";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return { loading: true, products: [] };
    }
    case PRODUCT_LIST_SUCCESS: {
      return { loading: false, products: action.payload };
    }
    case PRODUCT_LIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default productsListReducer;
