import axios from "axios";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const handleImage = async () => {
      try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=3&limit=30`);
        setImages(response.data);
      } catch (error) {
        console.log("error");
      }
    };

    handleImage();
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleIsOpen = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="gallery">
      {images.map((items, index) => (
        <div
          className="galleryimages"
          key={index}
          onClick={() => handleIsOpen(index)}
        >
          <img src={items.download_url} alt="/" height="100%" width="100%" />
        </div>
      ))}

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={images.map((img) => ({ src: img.download_url }))}
        />
      )}
    </div>
  );
};

export default Gallery;
