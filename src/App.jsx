import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import CartUI from "./components/CartUI";
import { CartProvider } from "./context/CartContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/shop/:productType/:productName"
        element={<ProductDetails />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
      <CartUI />
    </CartProvider>
  );
};

export default App;
