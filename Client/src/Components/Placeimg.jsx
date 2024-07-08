import React from 'react';

// for getting each image by index and return
// for getting images from url and show  

const Placeimg = ({ place, index = 0, className = 'object-cover w-full h-full' }) => {
  if (!place?.photos?.length) {
    return null; // Return null to avoid rendering an empty string
  }

  const photoUrl = `http://localhost:3069/user/uploads/${place.photos[index]}`;
  
  return (
    <img  className={className} src={photoUrl} alt={`Image of ${place.title}`} />
  );
};

export default Placeimg;
