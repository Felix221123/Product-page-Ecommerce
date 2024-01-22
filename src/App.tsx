//main App
import Navbar from "./components/Navbar/Navbar";
import ProductDetials from "./components/HeaderParaComp/ProductDetails";
import ShowImages from "./components/ImagesComp/ShowImage";
import "./App.css"
import "../src/components/Navbar/navbar.css"
import AddToCart from "./components/AddToCartComp/AddToCartComp";
import { useState } from "react";

//Main APP function
function App() {
  //handling the data passing from addtoCart to Navbar
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleAddToCart = (amount: number) => {
    console.log(`Added ${amount} items to the cart`);
    setCartQuantity(amount);
  };

  const handleRemoveItems = () => {
    setCartQuantity(0);
  };


  return (
    <>
      <Navbar cartQuantity={cartQuantity} handleRemoveItems={ handleRemoveItems} />
      <div className="image-product-details-container">
        <ShowImages /> 
        <div className="product-details-cart-container">
          <ProductDetials />
          <AddToCart onAddToCart={handleAddToCart}/>
        </div>
      </div>
    </>
  );
}

export default App;
