import axios from "axios";

const USER_LOGIN_REQUEST = "users/USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "users/USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "users/USER_LOGIN_FAIL";
const USER_LOGOUT = "users/USER_LOGOUT";

const USER_REGISTER_REQUEST = "users/USER_REGISTER_REQUEST";
const USER_REGISTER_SUCCESS = "users/USER_REGISTER_SUCCESS";
const USER_REGISTER_FAIL = "users/USER_REGISTER_FAIL";

const USER_DETAILS_REQUEST = "users/USER_DETAILS_REQUEST";
const USER_DETAILS_SUCCESS = "users/USER_DETAILS_SUCCESS";
const USER_DETAILS_FAIL = "users/USER_DETAILS_FAIL";
export const USER_DETAILS_RESET = "users/USER_DETAILS_RESET";

const USER_UPDATE_PROFILE_REQUEST = "users/USER_UPDATE_PROFILE_REQUEST";
const USER_UPDATE_PROFILE_SUCCESS = "users/USER_UPDATE_PROFILE_SUCCESS";
const USER_UPDATE_PROFILE_FAIL = "users/USER_UPDATE_PROFILE_FAIL";
export const USER_UPDATE_PROFILE_RESET = "users/USER_UPDATE_PROFILE_RESET";

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

    dispatch({
      type: USER_LOGIN_SUCCESS,
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState("userLogin");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState("userLogin");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

const usersLoginReducer = (state = {}, action) => {
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
    default:
      return state;
  }
};

export const usersRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return { loading: true };
    }
    case USER_REGISTER_SUCCESS: {
      return { loading: false, userInfo: action.payload };
    }
    case USER_REGISTER_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST: {
      return { ...state, loading: true };
    }
    case USER_DETAILS_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case USER_DETAILS_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_DETAILS_RESET: {
      return { user: {} };
    }
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST: {
      return { loading: true };
    }
    case USER_UPDATE_PROFILE_SUCCESS: {
      return { loading: false, success: true, userInfo: action.payload };
    }
    case USER_UPDATE_PROFILE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_UPDATE_PROFILE_RESET: {
      return {};
    }
    default:
      return state;
  }
};

export default usersLoginReducer;
