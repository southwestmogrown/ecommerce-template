import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { getProduct } from "../store/productDetails";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();

  const { id } = useParams();
  const productObj = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();

  const { error, loading, product } = productObj;

  useEffect(() => {
    async function fetchProduct() {
      await dispatch(getProduct(id));
    }

    fetchProduct();
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <main>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          {product && (
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Price: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3} me={2}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1}>{x + 1}</option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item className="d-grid gap-2">
                      <Button
                        type="button"
                        disabled={product.countInStock === 0 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      )}
    </main>
  );
}

export default ProductScreen;
