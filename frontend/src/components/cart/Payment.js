import React, { useEffect, useState } from "react";

import { countries } from "countries-list";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const options = {
  style: { base: { fontSize: "16px" }, invalid: { color: "#9e2146" } },
};

const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {}, []);

  return (
    <>
      <MetaData title="Shipping info" />

      <CheckoutSteps shipping confirmOrder payment />

      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form class="shadow-lg">
            <h1 class="mb-4">Card Info</h1>
            <div class="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                class="form-control"
                value=""
                options={options}
              />
            </div>

            <div class="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                class="form-control"
                value=""
                options={options}
              />
            </div>

            <div class="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                class="form-control"
                value=""
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" class="btn btn-block py-3">
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
