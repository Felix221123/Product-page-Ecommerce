// AddToCart.tsx
import { useState } from "react";
import Cartbtn from "../assets/images/icon-cart.svg";
import "./AddToCart.css";
import Plusbtn from "../assets/images/icon-plus.svg";
import Minusbtn from "../assets/images/icon-minus.svg";

interface QuantityProp {
  onAddToCart: (amount: number) => void;
}

const AddToCart = ({ onAddToCart }: QuantityProp) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(quantity);
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  const settingOpac = {
    opacity: 1,
    transition: "opacity 0.5s",
  };
  const settingOpacBelowZero = {
    opacity: 0.5,
    transition: "opacity 0.5s",
  };

  return (
    <>
      <div className="addToCartContainer">
        {/* Quantity management */}
        <div className="quantityContainer">
          <button onClick={handleDecreaseQuantity} className="quantityStyle">
            <img src={Minusbtn} alt="minus button" />
          </button>
          <span className="amountStyle">{quantity}</span>
          <button onClick={handleIncreaseQuantity} className="quantityStyle">
            <img src={Plusbtn} alt="plus button" />
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          className="addToCartBtn"
          style={quantity > 0 ? settingOpac : settingOpacBelowZero}
          onClick={handleAddToCart}
        >
          <img src={Cartbtn} alt="My cart button icon" />
          <span>Add to Cart</span>
        </button>
      </div>
    </>
  );
};

export default AddToCart;
