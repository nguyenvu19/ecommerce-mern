import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";

function Home(props) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => {
                  <Product key={product._id} product={product} />;
                })}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
