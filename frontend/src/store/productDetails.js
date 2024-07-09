import axios from "axios";

const PRODUCT_DETAILS_REQUEST = "products/PRODUCT_DETAILS_REQUEST";
const PRODUCT_DETAILS_SUCCESS = "products/PRODUCT_DETAILS_SUCCESS";
const PRODUCT_DETAILS_FAIL = "products/PRODUCT_DETAILS_FAIL";

export const getProduct = (id) => async (dispatch) => {
  console.log("here");
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const productDetailsReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: {
      return { loading: true, product: null };
    }
    case PRODUCT_DETAILS_SUCCESS: {
      return { loading: false, product: action.payload };
    }
    case PRODUCT_DETAILS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default productDetailsReducer;
