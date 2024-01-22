//Navbar component
import Avatar from "../assets/images/image-avatar.png";
import MenuBar from "../assets/images/icon-menu.svg";
import Logo from "../assets/images/logo.svg";
import Cart from "../assets/images/icon-cart.svg";
import MenuClose from "../assets/images/icon-close.svg";
import { useState, useEffect } from "react";
import "../Navbar/navbar.css";
import RemoveBtn from "../assets/images/icon-delete.svg";
import ShoeImage1Small from "../assets/images/image-product-1-thumbnail.jpg";
import { productDetials } from "../HeaderParaComp/ProductDetails";

interface QuanityProp {
  cartQuantity: number;
  handleRemoveItems: () => void;
}

const Navbar = ({ cartQuantity, handleRemoveItems }: QuanityProp) => {
  const [menuVisibility, setMenuVisibility] = useState(
    window.innerWidth > 1440
  );
  const [cartVisibility, setCartVisibility] = useState(false);
    const toggleCartVisibility = () => {
        console.log("Toggling cart visibility");
    setCartVisibility((prevVisibility) => !prevVisibility);
  };

  //list of navigations
  const navbarList = ["Collections", "Men", "Women", "About", "Contact"];

  //function to handle click of menu bar
  const handleMenuBarOpen = () => {
    setMenuVisibility(true);
  };

  // function to handle the close menu event
  const handleMenuBarClose = () => {
    setMenuVisibility(false);
  };
  const handleMenuBarCloseForEachNav = () => {
    if (window.innerWidth <= 1439) {
      setMenuVisibility(false);
    }
  };

  // this use effect is used to handle screen resizable
  useEffect(() => {
    const handleResize = () => {
      // Set menuVisibility to true when window width is beyond 1440px
      setMenuVisibility(window.innerWidth >= 1440);
      console.log("menu visibilty is 1440px or more");
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Call it once to set the initial state
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // updates the body background whenever the visiblity of the menu changes
  useEffect(() => {
    // Check conditions and update overlay styles
    if (window.innerWidth < 1440 && menuVisibility) {
      document.body.classList.add("overlay-active");
    } else {
      document.body.classList.remove("overlay-active");
    }

    // Cleanup the overlay styles on component unmount
    return () => {
      document.body.classList.remove("overlay-active");
    };
  }, [menuVisibility]); // Run effect whenever menuVisibility changes

  //cart container settings
  const getPrice = () => {
    const price = parseFloat(productDetials.actualPrice.slice(1));
    return isNaN(price) ? 0 : price;
  };
  const getTotalAmount = () => {
    const productPrice = getPrice();
    let totalAmount;
    totalAmount = (productPrice * cartQuantity).toFixed(2);
    return totalAmount;
  };

  const [isCartEmpty, setIscartEmpty] = useState(cartQuantity === 0);

  const HandleRemoveItems = () => {
    setIscartEmpty(true);
    handleRemoveItems();
  };

  useEffect(() => {
    // Update isCartEmpty based on cartQuantity
    setIscartEmpty(cartQuantity === 0);
  }, [cartQuantity]);

  const notifVisible = {
      display: "flex",
      transition : "0.3s"
  };

  const notifHidden = {
      display: "none",
      transition : "0.3s"
  };

  return (
    <>
      <div className="navbar-container">
        {/* container for both menu bar and the logo */}
        <div className="logo-navbar-container">
          <img
            src={MenuBar}
            alt="Open Menu"
            onClick={handleMenuBarOpen}
            className="menu-icon"
          />
          <header className="header-logo">
            <img src={Logo} alt="header logo icon" />
          </header>

          {menuVisibility && (
            <nav
              className={`navbar-list-container ${
                menuVisibility ? "menu-open" : "menu-close"
              }`}
            >
              <img
                src={MenuClose}
                alt="menu close icon"
                onClick={handleMenuBarClose}
                className="menuClose-icon"
              />

              <div className="my-navbar-list">
                {navbarList.map((each, index) => (
                  <a
                    href="#"
                    key={index}
                    onClick={handleMenuBarCloseForEachNav}
                  >
                    {each}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>

        {/* container for both the cart and the avatar */}
        <div className="cart-avatar-container">
          <div className="cart-count-container">
            <img src={Cart} alt="cart icon" onClick={toggleCartVisibility} />
            <div
              className="cart-counter-container"
              style={cartQuantity === 0 ? notifHidden : notifVisible}
            >
              {cartQuantity}
            </div>
          </div>
          <img src={Avatar} alt="profile avatar" className="avatar-icon" />
        </div>
      </div>

      {/* cart container */}
      {cartVisibility && (
        <div
          className={`cart-container ${
            cartVisibility ? "cart-animation-open" : "cart-animation-close"
          }`}
        >
          <p className="cart-header">Cart</p>
          <hr />
          <div className="mycartDetails">
            {!isCartEmpty ? (
              <div className="items-container">
                <div className="main-items-container">
                  <img src={ShoeImage1Small} alt="show image" />
                  <div className="items-details-container">
                    <p className="product-name">{productDetials.productName}</p>
                    <p className="price-details">
                      {productDetials.actualPrice} x {cartQuantity}{" "}
                      <span className="total-amount">${getTotalAmount()}</span>
                    </p>
                  </div>
                  <button>
                    <img
                      src={RemoveBtn}
                      alt="remove item"
                      onClick={HandleRemoveItems}
                    />
                  </button>
                </div>
                <button className="checkoutBtn">Checkout</button>
              </div>
            ) : (
              <p className="emptyText">Your cart is empty.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
