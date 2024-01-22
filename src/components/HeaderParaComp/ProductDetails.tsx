import "../HeaderParaComp/product-details.css";

export const productDetials = {
  header: "sneaker company",
  productName: "Fall Limited Edition Sneakers",
  paragraph:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  actualPrice: "$125.00",
  discount: "50%",
  priceDiscout: "$250.00",
};
//Main function to display the headers and the paragraph
function ProductDetials() {
  return (
    <>
      <div className="myProductDetialsContainer">
        <div className="company-product-name">
          <p className="company-name">{productDetials.header}</p>
          <p className="product-name">{productDetials.productName}</p>
        </div>

        <div className="paragraph-price-container">
          <p className="paragraph-txt">{productDetials.paragraph}</p>
          <div className="price-container">
            <div className="actual-price-discount">
              <p className="actual-price">{productDetials.actualPrice}</p>
              <p className="discout">{productDetials.discount}</p>
            </div>
            <div className="price-disocunt">{productDetials.priceDiscout}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetials;
