import { } from "react";
import { motion } from "framer-motion";
import StackedImages from "./StackedImages";
import SocialLinks from "./SocialLinks";

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
        <div className="absolute inset-0 bg-acses-green-500/95"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8 sm:space-y-[4rem]">
            <div className="space-y-2 sm:space-y-6">
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
                className="max-w-[600px] text-acses-green-100 md:text-xl italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Empowering future tech leaders through innovation,
                collaboration, and excellence.
              </motion.p>
            </div>
            
            {/* Social Links and Button */}
            <SocialLinks />
          </div>

          {/* Stacked Images with Tilt Effect */}
          <StackedImages />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
