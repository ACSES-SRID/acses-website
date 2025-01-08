import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations
import { LucideCode, LucideDatabase } from "lucide-react"; // Icons from lucid-react

const HeroSection01 = () => {
    const images = [
    "https://i.pinimg.com/736x/64/a4/c2/64a4c212a61a5c47f4b859d4b2046d0c.jpg",
    "https://i.pinimg.com/736x/b5/78/5a/b5785af39d097409d685d68c242c146a.jpg",
    "https://i.pinimg.com/736x/8c/a5/26/8ca526b2042d2dae10511a80f3d5866a.jpg",
    ];
    
    const [currentImg, setCurrentImg] = useState(images[0]); // Start with the first image
    const [imageIndex, setImageIndex] = useState(0); // Keep track of the current image index

    useEffect(() => {
    // Change the image every 5 seconds
    const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);

    useEffect(() => {
    // Update the image when the index changes
    setCurrentImg(images[imageIndex]);
    }, [imageIndex]);
    
    
  return (
    <section id="home" className="relative px-6 py-20 overflow-hidden text-white pt-28 md:pt-32 bg-acses-green-900 md:px-16">
      {/* Top Glow Effect */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-acses-yellow-500 to-acses-green-500 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-acses-yellow-500 to-acses-green-500 opacity-30 blur-3xl"></div>

      <div className="container flex flex-col items-center gap-24 mx-auto md:flex-row">
        {/* Left Section - Text and Call to Action */}
        <div className="max-w-xl text-center md:text-left">
          <motion.h1
            className="text-3xl font-extrabold leading-tight md:text-5xl text-acses-yellow-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Association of Computer Science <br />
            and Engineering Students, <br />
            <span className="text-white">SRID</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-acses-green-200"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Empowering future tech leaders through innovation, collaboration, and excellence.
          </motion.p>
          <motion.div
            className="flex justify-center gap-6 mt-8 md:justify-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a href="#contact" className="px-6 py-3 font-medium text-white transition rounded-lg bg-acses-green-500 hover:bg-acses-green-400">
              Join Us
            </a>
            <a href="#about" className="px-6 py-3 font-medium transition border rounded-lg border-acses-yellow-500 text-acses-yellow-500 hover:bg-acses-yellow-400 hover:text-white">
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right Section - Futuristic Illustration and Image */}
        <motion.div
          className="relative flex items-center justify-center w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-full p-8 border-4 rounded-full shadow-lg aspect-square bg-acses-green-800 border-acses-yellow-500">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-50 bg-acses-yellow-500 blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-50 bg-acses-green-500 blur-2xl animate-pulse"></div>
            {/* Image in the Center */}
            <img
              src={currentImg} // Replace with an appropriate image URL
              alt="Futuristic Computer Science"
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          {/* Animated Cards */}
          <motion.div
            className="absolute bottom-[-40px] left-[-20px] w-[280px] bg-acses-green-800 text-acses-green-200 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <LucideCode size={32} className="mb-4 text-acses-yellow-500" />
            <h3 className="text-lg font-bold">Learn Programming</h3>
            <p className="text-sm">Empower yourself with coding skills</p>
          </motion.div>

          <motion.div
            className="absolute top-[-20px] right-[-50px] w-[280px] bg-acses-green-800 text-acses-green-200 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <LucideDatabase size={32} className="mb-4 text-acses-yellow-500" />
            <h3 className="text-lg font-bold">Explore Data Science</h3>
            <p className="text-sm">Dive deep into the world of data</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection01;
