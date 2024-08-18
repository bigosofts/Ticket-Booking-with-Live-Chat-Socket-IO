"use client";
import { useEffect } from "react";

function HeroSection(props) {

 
  function hardRefresh() {
    const parallax_el = document.querySelectorAll(".parallax");

    let xValue = 0,
      yValue = 0;

    let rotateDegree = 0;

    function update(cursorPosition) {
      parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isInLeft =
          parseFloat(getComputedStyle(el).left) < window.innerWidth / 2
            ? 1
            : -1;
        let zValue =
          (cursorPosition - parseFloat(getComputedStyle(el).left)) *
          isInLeft *
          0.1;

        el.style.transform = `translateX(calc(-50% + ${
          -xValue * speedx
        }px)) translateY(calc(-50% + ${
          yValue * speedy
        }px)) perspective(2300px) rotateY(${
          rotateDegree * rotateSpeed
        }deg) translateZ(${zValue * speedz}px)`;
      });
    }
    update(0);

    window.addEventListener("mousemove", (e) => {
      if (timeline.isActive()) return;
      xValue = e.clientX - window.innerWidth / 2;
      yValue = e.clientY - window.innerHeight / 2;

      rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
      update(e.clientX);
    });

    /* Gsap animation */

    let timeline = gsap.timeline();

    Array.from(parallax_el)
      .filter((el) => !el.classList.contains("text"))
      .forEach((el) => {
        timeline.from(
          el,
          {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration: 3.5,
            ease: "power3.out",
          },
          "1"
        );
      });

    timeline
      .from(
        ".text h1",
        {
          y:
            window.innerHeight -
            document.querySelector(".text h1").getBoundingClientRect().top +
            200,
          duration: 2,
        },
        "2.5"
      )
      .from(
        ".text h2",
        {
          Y: -150,
          opacity: 0,
          duration: 1.5,
        },
        "3"
      )
      .from(
        ".hide",
        {
          opacity: 0,
          duration: 1.5,
        },
        "3"
      );
  }
  

  useEffect(() => {

    import("../../assets/js/gsap.js");
  
  }, []);

  return (
    <main onClick={hardRefresh}>
      <div className="container-parallax">
        <div className="vignette hide"></div>
        <img
          className="parallax bg-img"
          data-speedx="0.3"
          data-speedy="0.38"
          data-speedz="0"
          data-rotation="0"
          data-distance="-200"
          src="/hero-img/background.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-7"
          data-speedx="0.27"
          data-speedy="0.32"
          data-speedz="0"
          data-rotation="0"
          data-distance="850"
          src="/hero-img/fog_7.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-10"
          data-speedx="0.195"
          data-speedy="0.305"
          data-speedz="0"
          data-rotation="0"
          data-distance="1100"
          src="/hero-img/mountain_10.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-6"
          data-speedx="0.25"
          data-speedy="0.28"
          data-speedz="0"
          data-rotation="0"
          data-distance="1400"
          src="/hero-img/fog_6.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-9"
          data-speedx="0.125"
          data-speedy="0.155"
          data-speedz="0.15"
          data-rotation="0.02"
          data-distance="1700"
          src="/hero-img/mountain_9.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-8"
          data-speedx="0.1"
          data-speedy="0.11"
          data-speedz="0"
          data-rotation="0.02"
          data-distance="1800"
          src="/hero-img/mountain_8.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-5"
          data-speedx="0.16"
          data-speedy="0.105"
          data-speedz="0"
          data-rotation="0"
          data-distance="1900"
          src="/hero-img/fog_5.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-7"
          data-speedx="0.1"
          data-speedy="0.1"
          data-speedz="0"
          data-rotation="0.09"
          data-distance="2000"
          src="/hero-img/mountain_7.png"
          alt=""
        />
        <div
          className="para-text text parallax"
          data-speedx="0.07"
          data-speedy="0.07"
          data-speedz="0"
          data-rotation="0.11"
          data-distance="0"
        >
          <h2 id="h2-text">Active</h2>
          <h1 id="h1-text">Ascents</h1>
        </div>
        <img
          className="para-hidden parallax mountain-6"
          data-speedx="0.065"
          data-speedy="0.05"
          data-speedz="0.05"
          data-rotation="0.12"
          data-distance="2300"
          src="/hero-img/mountain_6.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-4"
          data-speedx="0.135"
          data-speedy="0.120"
          data-speedz="0"
          data-rotation="0"
          data-distance="2400"
          src="/hero-img/fog_4.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-5"
          data-speedx="0.08"
          data-speedy="0.07"
          data-speedz="0.13"
          data-rotation="0.1"
          data-distance="2550"
          src="/hero-img/mountain_5.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-3"
          data-speedx="0.11"
          data-speedy="0.018"
          data-speedz="0"
          data-rotation="0"
          data-distance="2800"
          src="/hero-img/fog_3.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-4"
          data-speedx="0.059"
          data-speedy="0.024"
          data-speedz="0"
          data-rotation="0.14"
          data-distance="3200"
          src="/hero-img/mountain_4.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-3"
          data-speedx="0.04"
          data-speedy="0.018"
          data-speedz="0.32"
          data-rotation="0.05"
          data-distance="3400"
          src="/hero-img/mountain_3.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-2"
          data-speedx="0.15"
          data-speedy="0.0115"
          data-speedz="0"
          data-rotation="0"
          data-distance="3600"
          src="/hero-img/fog_2.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-2"
          data-speedx="0.035"
          data-speedy="0.013"
          data-speedz="0.42"
          data-rotation="0.15"
          data-distance="3800"
          src="/hero-img/mountain_2.png"
          alt=""
        />
        <img
          className="para-hidden parallax mountain-1"
          data-speedx="0.027"
          data-speedy="0.018"
          data-speedz="0.53"
          data-rotation="0.2"
          data-distance="4000"
          src="/hero-img/mountain_1.png"
          alt=""
        />
        <img
          className="para-hidden sun-rays hide"
          src="/hero-img/sun_rays.png"
          alt=""
        />
        <img
          className="para-hidden black-shadow hide"
          src="/hero-img/black_shadow.png"
          alt=""
        />
        <img
          className="para-hidden parallax fog-1"
          data-speedx="0.12"
          data-speedy="0.01"
          data-speedz="0"
          data-rotation="0"
          data-distance="4200"
          src="/hero-img/fog_1.png"
          alt=""
        />
      </div>
    </main>
  );
}

export default HeroSection;
