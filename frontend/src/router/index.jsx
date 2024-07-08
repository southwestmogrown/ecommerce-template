import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "./Layout";
import ProductScreen from "../screens/ProductScreen";

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
    ],
  },
]);
