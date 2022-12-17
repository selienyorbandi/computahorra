import { useState, useEffect } from "react";

import Controls from "./controls/Controls";

import styles from "./styles.module.css";

function Slideshow({
  images,
  autoplay,
  controls,
}: {
  images: string[];
  autoplay: boolean;
  controls: boolean;
}) {
  const [slidePosition, setSlidePosition] = useState(0);
  const slides = images;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        slidePosition < slides.length - 1
          ? setSlidePosition(slidePosition + 1)
          : setSlidePosition(0);
      }, 2500);
      return () => clearInterval(interval);
    }
  });

  const toLeft = () => {
    slidePosition > 0 ? setSlidePosition(slidePosition - 1) : setSlidePosition(slides.length - 1);
  };
  const toRight = () => {
    slidePosition < slides.length - 1 ? setSlidePosition(slidePosition + 1) : setSlidePosition(0);
  };

  return (
    <div className={styles.Slideshow}>
      <div className={styles.Slideshow__img}>
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            alt=""
            className={slidePosition === index ? styles.Slideshow__img__active : ""}
          />
        ))}
      </div>
      {controls ? <Controls toLeft={toLeft} toRight={toRight} /> : <></>}
    </div>
  );
}

export default Slideshow;
