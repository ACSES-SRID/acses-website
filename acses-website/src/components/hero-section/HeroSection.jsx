import React from "react";
import Xlogo from '../xlogo/XLogo';

const HeroSection = () => {
  return (
    <section className="relative w-full flex justify-center pt-[120px] py-12 md:py-24 lg:py-32 xl:py-48">
      {/* Background with green overlay */}
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/originals/05/ec/48/05ec4876e7d36fe31716557ddc2bd7ee.gif"
          alt="Hero Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-acses-green-500/90"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              {/* Animated Heading */}
              <motion.h1
                className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                Association of Computer Science and Engineering Students, SRID
              </motion.h1>
              {/* Animated Slogan */}
              <motion.p
                className="max-w-[600px] text-white md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Empowering future tech leaders through innovation,
                collaboration, and excellence.
              </motion.p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex justify-center items-center space-x-4 py-3 px-3 bg-white rounded-md h-full md:py-0">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-blue-600 transition-colors"
                >
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-blue-400 transition-colors"
                >
                  <Xlogo style={{ width: '18px', height: '18px' }} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-black transition-colors"
                >
                  <i className="fab fa-tiktok fa-lg"></i>
                </a>
              </div>
              <motion.a
                className="inline-flex items-center justify-center h-10 px-8 py-4 text-sm font-bold transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="#about"
                whileHover={{ scale: 1.1 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>

          {/* Stacked Images with Tilt Effect */}
          <StackedImages />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
