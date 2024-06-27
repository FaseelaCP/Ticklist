import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import eventsImage from "../../assets/events.jpg";
import attractionsImage from "../../assets/attractions.jpg";
import sportsImage from "../../assets/sports.jpg";
import venuesImage from "../../assets/venues.jpg";

const images = [
  {
    label: "Venues",
    imgPath: venuesImage,
  },
  {
    label: "Attractions",
    imgPath: attractionsImage,
  },
  {
    label: "Sports",
    imgPath: sportsImage,
  },

  {
    label: "Events",
    imgPath: eventsImage,
  },
];

function MyCarousel() {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const handleSelect = (index) => {
    setSelectedSlide(index);
  };

  return (
    <Carousel
      autoPlay
      interval={3000} // Change interval time as needed
      selectedItem={selectedSlide}
      onChange={handleSelect}
      infiniteLoop
      showStatus={false}
      showThumbs={false}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.imgPath}
            alt={image.label}
            height={400}
            style={{ objectFit: "fill", borderRadius: "10px" }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
