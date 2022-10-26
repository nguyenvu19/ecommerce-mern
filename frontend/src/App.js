import React from "react";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div classNameName="container container-fluid">
          <Routes>
            <Route path="/" element={Home} exact />
            <Route path="/search/:keyword" element={Home} />
            <Route path="/product/:id" element={ProductDetails} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
