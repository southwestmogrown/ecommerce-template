import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { thunkLoadProducts } from "../store/products";
import { useDispatch, useSelector } from "react-redux";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productStore.products);

  useEffect(() => {
    async function fetchProducts() {
      await dispatch(thunkLoadProducts());
    }

    fetchProducts();
  }, [dispatch]);

  return productList ? (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {productList.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default HomeScreen;
