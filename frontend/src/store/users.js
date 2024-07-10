import axios from "axios";

const USER_LOGIN_REQUEST = "users/USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "users/USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "users/USER_LOGIN_FAIL";
const USER_LOGOUT = "users/USER_LOGOUT";

const USER_REGISTER_REQUEST = "users/USER_REGISTER_REQUEST";
const USER_REGISTER_SUCCESS = "users/USER_REGISTER_SUCCESS";
const USER_REGISTER_FAIL = "users/USER_REGISTER_FAIL";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      {
        username: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register/",
      {
        name: name,
        email: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { loading: true };
    }
    case USER_LOGIN_SUCCESS: {
      return { loading: false, userInfo: action.payload };
    }
    case USER_LOGIN_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_LOGOUT: {
      return {};
    }
    case USER_REGISTER_REQUEST: {
      return { loading: true };
    }
    case USER_REGISTER_SUCCESS: {
      return { loading: false, userInfo: action.payload };
    }
    case USER_REGISTER_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default usersReducer;
