import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../store/products";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productStore);
  const { error, loading, products } = productList;

  console.log(error);
  useEffect(() => {
    async function fetchProducts() {
      await dispatch(listProducts());
    }

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
