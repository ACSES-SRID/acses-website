import { } from "react";
import Xlogo from "../xlogo/XLogo";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const socialIcons = [
    {
      link: "https://linkedin.com",
      icon: "linkedin",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      link: "https://twitter.com",
      icon: "twitter",
      color: "text-blue-400 hover:text-blue-500",
    },
    {
      link: "https://instagram.com",
      icon: "instagram",
      color: "text-pink-500 hover:text-pink-600",
    },
    {
      link: "https://tiktok.com",
      icon: "tiktok",
      color: "text-gray-900 hover:text-black",
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full gap-6 px-0 sm:flex-row sm:justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {/* Social Icons Section */}
      <div className="flex items-center justify-center w-full gap-4 px-4 py-3 bg-white rounded-lg shadow-lg sm:w-auto sm:px-6">
        {socialIcons.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-transform ${social.color}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {social.icon === "twitter" ? (
              <Xlogo className="w-6 h-6" />
            ) : (
                <i className={`fab fa-${social.icon} text-3xl`}></i>
            )}
          </motion.a>
        ))}
      </div>

      {/* Learn More Button Section */}
      <motion.a
        href="#about"
        className="w-full px-6 py-3 font-medium text-center transition-all bg-white rounded-lg shadow-lg text-acses-green-600 hover:text-white hover:bg-acses-green-700 hover:border-acses-green-200 hover:shadow-md hover:shadow-gray-100 focus:outline-none focus:ring-2 focus:ring-acses-green-400 sm:w-auto sm:px-8 sm:py-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More
      </motion.a>
    </motion.div>
  );
};

export default SocialLinks;
