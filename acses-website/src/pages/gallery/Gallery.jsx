import React, { useState } from "react";
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  
  return (
    <>
      <NavBar />
      <h1>Gallery</h1>
      <Footer />
    </>
  )
}

export default Gallery