import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { Carousel } from "react-bootstrap";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  function removeCartHandler(id) {
    dispatch(removeItemFromCart(id));
  }

  function increaseQty(id, quantity, stock) {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  }

  function decreaseQty(id, quantity) {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  }
  return (
    <>
      <MetaData title="Cart" />

      {cartItems.length === 0 ? (
        <h2 className="mt-5">Emty</h2>
      ) : (
        <>
          <h2 class="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartHandler(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">3 (Units)</span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">$765.56</span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;