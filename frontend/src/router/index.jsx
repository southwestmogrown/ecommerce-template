import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "./Layout";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "products/:id/",
        element: <ProductScreen />,
      },
      {
        path: "cart/:id?/",
        element: <CartScreen />,
      },
      {
        path: "login/",
        element: <LoginScreen />,
      },
      {
        path: "register/",
        element: <RegisterScreen />,
      },
      {
        path: "profile/",
        element: <ProfileScreen />,
      },
      {
        path: "shipping/",
        element: <ShippingScreen />,
      },
      {
        path: "payment/",
        element: <h1>Payment</h1>,
      },
    ],
  },
]);
