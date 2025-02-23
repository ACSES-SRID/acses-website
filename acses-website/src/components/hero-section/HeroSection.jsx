import {} from "react";
import { motion } from "framer-motion";
import Xlogo from "../xlogo/XLogo";
import StackedImages from "./StackedImages";

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
            <motion.div
              className="flex flex-col gap-4 min-[400px]:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="flex items-center justify-center h-full px-3 py-3 space-x-4 bg-white rounded-md md:py-0">
                {[
                  {
                    link: "https://www.linkedin.com/in/association-of-computer-science-and-engineering-students-srid-068296343/",
                    icon: "linkedin",
                    color: "blue-600",
                  },
                  {
                    link: "https://x.com/Acsessrid",
                    icon: "twitter",
                    color: "blue-400",
                  },
                  {
                    link: "https://www.instagram.com/acsessrid/",
                    icon: "instagram",
                    color: "pink-500",
                  },
                  {
                    link: "https://www.tiktok.com/@acsessrid1?_t=ZM-8spJTnaQtGv&_r=1",
                    icon: "tiktok",
                    color: "black",
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center text-gray-900 transition-colors hover:text-${social.color}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon === "twitter" ? (
                      <Xlogo style={{ width: "18px", height: "18px" }} />
                    ) : (
                      <i
                        className={`fab fa-${social.icon} w-[18px] h-[18px]`}
                      ></i>
                    )}
                  </motion.a>
                ))}
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
