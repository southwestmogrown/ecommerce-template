import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "./Layout";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";

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
        path: "products/:id",
        element: <ProductScreen />,
      },
      {
        path: "cart/:id?",
        element: <CartScreen />,
      },
    ],
  },
]);
