// @ts-nocheck
import { useState, createRef } from "react";
import Image from "next/image";

const images = [
  "/pies/grass_color_distribution.png",
  "/pies/fire_color_distribution.png",
  "/pies/water_color_distribution.png",
  "/pies/electric_color_distribution.png",
];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const refs = images.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = images.length;
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`absolute text-white text-2xl z-10 h-10 w-10 flex items-center justify-center cursor-pointer ${
        isLeft ? "left-2" : "right-2"
      }`}
      style={{ top: "45%" }}
    >
      <span>
        {isLeft ? (
          <Image
            src={"/left_arrow.png"}
            alt="left arrow"
            width={100}
            height={100}
          />
        ) : (
          <Image
            src={"/right_arrow.png"}
            alt="right-arrow"
            width={100}
            height={100}
          />
        )}
      </span>
    </button>
  );

  return (
    <div className="flex w-full justify-center items-center">
      <div className="relative justify-center">
        <div className="carousel">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div
              className="flex w-full h-[500px] flex-shrink-0 justify-center items-center"
              key={img}
              ref={refs[i]}
            >
              <img src={img} className="w-full h-full justify-center items-center object-contain" />
            </div>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
