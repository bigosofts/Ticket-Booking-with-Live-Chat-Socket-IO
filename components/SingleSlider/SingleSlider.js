"use client";
import { useEffect } from "react";
import "./SingleSlider.css";

const SingleSlider = ({ filler }) => {
  useEffect(() => {
    import("./SingleSlider.css");

    var sliderImages = document.querySelectorAll(".slide"),
      arrowLeft = document.querySelector("#arrow-left"),
      arrowRight = document.querySelector("#arrow-right"),
      current = 0;

    function reset() {
      for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
      }
    }

    function init() {
      reset();
      sliderImages[0].style.display = "block";
    }

    function slideLeft() {
      reset();
      sliderImages[current - 1].style.display = "block";
      current--;
    }

    arrowLeft.addEventListener("click", function () {
      if (current === 0) {
        current = sliderImages.length;
      }
      slideLeft();
    });

    function slideRight() {
      reset();
      sliderImages[current + 1].style.display = "block";
      current++;
    }

    arrowRight.addEventListener("click", function () {
      if (current === sliderImages.length - 1) {
        current = -1;
      }
      slideRight();
    });

    init();
  }, []);

  let slider = filler.travelImage;
  return (
    <div className="wrap">
      <div id="arrow-left" className="arrow"></div>

      <div id="slider">
        {slider.map((item, i) => (
          <div
            key={i}
            style={{ backgroundImage: `url("${item}")` }}
            className="slide slide1"
          >
            <div className="slide-content">{/* <span>Image 1</span> */}</div>
          </div>
        ))}
      </div>

      <div id="arrow-right" className="arrow"></div>
    </div>
  );
};

export default SingleSlider;
