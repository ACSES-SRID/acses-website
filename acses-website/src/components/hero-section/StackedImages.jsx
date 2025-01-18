import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const StackedImages = () => {
  // const initialImages = [
  //   "https://i.pinimg.com/736x/64/a4/c2/64a4c212a61a5c47f4b859d4b2046d0c.jpg",
  //   "https://i.pinimg.com/736x/b5/78/5a/b5785af39d097409d685d68c242c146a.jpg",
  //   "https://i.pinimg.com/736x/8c/a5/26/8ca526b2042d2dae10511a80f3d5866a.jpg",
  // ];
  
  const initialImages = [
    "/images/heroSection/ACSES24-67.JPG",
    "/images/heroSection/ACSES24-5.JPG",
    "/images/heroSection/ACSES24-77.JPG",
  ];

  const [images, setImages] = useState(initialImages);
  const [isAnimating, setIsAnimating] = useState(false); // Tracks if animation is in progress

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true); // Start animation
      setTimeout(() => {
        setImages((prevImages) => {
          // Rotate the array: move the first element to the end
          const [first, ...rest] = prevImages;
          return [...rest, first];
        });
        setIsAnimating(false); // End animation after transition
      }, 500); // Match this duration to CSS transition (500ms)
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <div className="relative ml-6 sm:ml-0 w-[85%] h-[250px] sm:h-full sm:w-full">
        {/* Render each image */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full overflow-hidden rounded-lg transition-transform duration-500 ease-in-out border border-acses-green-200 ${
              isAnimating ? "transform-scale" : ""
            }`}
            style={{
              transform: `translateY(${index * 15}px) translateX(${
                index * -15
              }px) rotate(${index * 2}deg)`,
              zIndex: images.length - index,
              opacity: index === 0 ? 1 : 0.9, // Make the top image slightly more prominent
              boxShadow:
                index === 0
                  ? "0px 8px 12px rgba(0, 0, 0, 0.4)"
                  : "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <motion.img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StackedImages;