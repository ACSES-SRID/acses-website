import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { ArrowRight, ArrowLeft } from "lucide-react";
import galleryItems from "./galleryItems";

const itemsPerPage = 9; // Number of items per page

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = galleryItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const CustomImage = ({ src, alt, width, height, className }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );

  const Dialog = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg p-6 max-w-4xl w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const DialogHeader = ({ title, description }) => (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 pt-24 py-32">
        <div className="container mx-auto py-8 px-4">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            ACSES Gallery
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Capturing moments from our events, workshops, and activities
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setSelectedImage(item)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.alt}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(item);
                  }
                }}
              >
                <CustomImage
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={390}
                  className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold">{item.alt}</h3>
                    <p className="text-sm text-gray-200">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-12">
            <button
              className="px-4 py-2 mx-2 text-white bg-gray-700 rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-acses-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 mx-2 text-white bg-gray-700 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)}>
          {selectedImage && (
            <>
              <DialogHeader
                title={selectedImage.alt}
                description={selectedImage.description}
              />
              <div className="relative aspect-video mt-2">
                <CustomImage
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="object-contain w-full"
                />
              </div>
            </>
          )}
        </Dialog>
        <div className="mt-3 ml-4 md:ml-12">
          <h3 className="text-xl  font-bold  text-left mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#124824] to-emerald-700">
            More Photos!
          </h3>
          <ul className="list-disc ml-8 text-gray-700">
            <li>
              <a
                href="https://braoseistudios.picflow.com/ojf97nk5dn"
                className="hover:underline"
              >
                Bits to Bytes 2024
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/drive/folders/1f_-_UB2GcLYEVTJCXPb92LjX2x5eR-KP?usp=sharing"
                className="hover:underline"
              >
                ACSES Week 2024
              </a>
            </li>
            {/* <li>
              <a href="/activities" className="hover:underline">
                Activities
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
