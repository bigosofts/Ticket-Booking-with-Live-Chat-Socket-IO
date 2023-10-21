"use client";
import { useEffect } from "react";
import "./ImageCarousel.css";

function ImageCarousel({ filler }) {
  useEffect(() => {
    import("./Carousel.js");
  }, []);
  let slider = filler.travelImage;
  return (
    <section className="Slider">
      <div>
        <img
          id="featuredImage"
          className="Slider-featuredImage"
          src={slider[0]}
          alt="#"
        />
      </div>

      <div className="Slider-thumbnails">
        {slider.map((item) => (
          <a href={item} className="Slider-thumbnail active">
            <img src={item} alt="#" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default ImageCarousel;
