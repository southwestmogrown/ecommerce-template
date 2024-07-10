import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "./Layout";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";

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
        element: <PaymentScreen />,
      },
      {
        path: "place-order/",
        element: <PlaceOrderScreen />,
      },
      {
        path: "/orders/:id/",
        element: <OrderScreen />,
      },
    ],
  },
]);
