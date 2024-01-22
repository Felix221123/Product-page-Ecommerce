import ShoeImage1Small from "../assets/images/image-product-1-thumbnail.jpg";
import ShowImage1Big from "../assets/images/image-product-1.jpg";
import ShowImage2Small from "../assets/images/image-product-2-thumbnail.jpg";
import ShowImage2Big from "../assets/images/image-product-2.jpg";
import ShowImage3Small from "../assets/images/image-product-3-thumbnail.jpg";
import ShowImage3Big from "../assets/images/image-product-3.jpg";
import ShowImage4Small from "../assets/images/image-product-4-thumbnail.jpg";
import ShowImage4Big from "../assets/images/image-product-4.jpg";
import NextBtn from "../assets/images/icon-next.svg";
import PrevBtn from "../assets/images/icon-previous.svg";
import CloseBtn from "../assets/images/icon-close.svg";
import { useEffect, useState } from "react";
import "../ImagesComp/ShowImages.css";

//main function for the displaying images
function ShowImages() {
  const [currentIndex, setCurrentIndex] = useState(0); //sets the currentindex based on the clicked image
  const [showBigImage, setShowBigImage] = useState(false); //this state is used to manage the setting images to shoe bigger than normal so that they can viewed properly with background dimmed color
  const [mobileTableVisibility, setmobileTableVisibility] = useState(
    window.innerWidth < 1440
  ); //setting how the images will be displayed due to screen sizes
  const [activeImageIndex, setActiveImageIndex] = useState(null); //sets the active image

  useEffect(() => {
    const handleImageShowResize = () => {
      setmobileTableVisibility(window.innerWidth < 1440);
    };
    //attaching the event listner
    window.addEventListener("resize", handleImageShowResize);
    // Call it once to set the initial state
    handleImageShowResize();
    return () => {
      window.removeEventListener("resize", handleImageShowResize);
    };
  }, []);

  const clickableImages = [
    ShoeImage1Small,
    ShowImage2Small,
    ShowImage3Small,
    ShowImage4Small,
  ];
  const showImages = [
    ShowImage1Big,
    ShowImage2Big,
    ShowImage3Big,
    ShowImage4Big,
  ];

  const handleNext = () => {
    const nextIndex: any = (currentIndex + 1) % clickableImages.length;
    setCurrentIndex(nextIndex);
    setActiveImageIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex: any =
      (currentIndex - 1 + clickableImages.length) % clickableImages.length;
    setCurrentIndex(prevIndex);
    setActiveImageIndex(prevIndex);
  };

  //handles the click event for whenever the small images are clicked
  const handleImageClick = (index: any) => {
    setCurrentIndex(index);
    setShowBigImage(true);
    setActiveImageIndex(index);
  };

  // handles the close for the image view
  const handleCloseClick = () => {
    setShowBigImage(false);
  };

  return (
    <>
      <div>
        {/* mobile or tablet view */}
        {mobileTableVisibility && (
          <div className="mobile-tablet-container">
            <img
              src={showImages[currentIndex]}
              alt={`Big Image ${currentIndex + 1}`}
              className="ActualImage"
            />

            <button onClick={handlePrev} className="white-circle-pre">
              <img src={PrevBtn} alt="Previous" />
            </button>

            <button onClick={handleNext} className="white-circle-next">
              <img src={NextBtn} alt="Next" />
            </button>
          </div>
        )}

        {/* desktop view only */}
        <div className="desktopVisiblity-container">
          <img
            src={showImages[currentIndex]}
            alt={`Big Image ${currentIndex + 1}`}
            className="myBigImageDesktopView"
          />
          <div className="mysmallimagescontainer">
            {clickableImages.map((smallImage, index) => (
              <div
                key={index}
                className={`${
                  activeImageIndex === index ? "borderActive" : ""
                }`}
              >
                <img
                  src={smallImage}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  className={`eachsmallImage ${
                    activeImageIndex === index ? "active" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* desktop view to properly view image */}
        {showBigImage && (
          <div className="desktopViewImages">
            <div className="imageContainer">
              <img
                src={showImages[currentIndex]}
                alt={`Big Image ${currentIndex + 1}`}
              />

              <button onClick={handlePrev} className="overviewPrebtn">
                <img src={PrevBtn} alt="Previous" />
              </button>

              <button onClick={handleNext} className="overviewNextbtn">
                <img src={NextBtn} alt="Next" />
              </button>

              <button onClick={handleCloseClick} className="closebtn">
                <img src={CloseBtn} alt="Close" />
              </button>
            </div>
            <div className="mysmallimagescontainer">
              {clickableImages.map((smallImage, index) => (
                <div
                  className={`${
                    activeImageIndex === index ? "borderActive activeImg" : ""
                  }`}
                >
                  <img
                    key={index}
                    src={smallImage}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleImageClick(index)}
                    className={`${activeImageIndex === index ? "active" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply the dimming effect on the body background when showBigImage is true */}
        {showBigImage && <div className="overlay"></div>}
      </div>
    </>
  );
}

export default ShowImages;
