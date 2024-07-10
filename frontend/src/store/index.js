import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";
import productsListReducer from "./productsList";
import productDetailsReducer from "./productDetails";
import cartReducer from "./cart";
import usersLoginReducer, {
  userDetailsReducer,
  userUpdateProfileReducer,
  usersRegisterReducer,
} from "./users";
import orderCreateReducer from "./orders";

const rootReducer = combineReducers({
  productList: productsListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: usersLoginReducer,
  userRegister: usersRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

let enhancer;

if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preLoadedState) => {
  return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;
