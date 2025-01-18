import { useEffect, useState } from "react";
import Xlogo from "../xlogo/XLogo";
import { motion } from "framer-motion"; // For animations
import { LucideCode, LucideDatabase, Linkedin, Instagram } from "lucide-react"; // Icons from lucid-react

const HeroSection01 = () => {
  const images = [
    "/images/heroSection/ACSES24-67.JPG",
    "/images/heroSection/ACSES24-5.JPG",
    "/images/heroSection/ACSES24-77.JPG",
  ];
  
  const [currentImg, setCurrentImg] = useState(images[0]); // Start with the first image
  const [imageIndex, setImageIndex] = useState(0); // Keep track of the current image index
  
  const [programmingHeading, setProgrammingHeading] = useState('');
  const programmingHeadingMessage = 'Learn Programming';
  const [programmingText, setProgrammingText] = useState('');
  const programmingTextMessage = 'Empower yourself with coding skills';
  
  const [dataScienecHeading, setDataScienecHeading] = useState('');
  const dataScienecHeadingMessage = 'Explore Data Science';
  const [dataScienceText, setdataScienceText] = useState('');
  const dataScienceTextMessage = 'Dive deep into the world of data';

  useEffect(() => {
    // Change the image every 5 seconds
    const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  useEffect(() => {
  // Update the image when the index changes
  setCurrentImg(images[imageIndex]);
  }, [imageIndex]);

  // For typewriter effect
  useEffect(() => {
    let currentTextPH = '';
    let currentIndexPH = 0;
    let currentTextPT = '';
    let currentIndexPT = 0;
    let currentTextDSH = '';
    let currentIndexDSH = 0;
    let currentTextDST = '';
    let currentIndexDST = 0;

    const typeWriterProgrammingHead = setInterval(() => {
      if (currentIndexPH < programmingHeadingMessage.length) {
        currentTextPH += programmingHeadingMessage[currentIndexPH];
        setProgrammingHeading(currentTextPH);
        currentIndexPH++;
      } else {
        clearInterval(typeWriterProgrammingHead);
      }
    }, 50);

    const typeWriterProgrammingText = setInterval(() => {
      if (currentIndexPT < programmingTextMessage.length) {
        currentTextPT += programmingTextMessage[currentIndexPT];
        setProgrammingText(currentTextPT);
        currentIndexPT++;
      } else {
        clearInterval(typeWriterProgrammingText);
      }
    }, 50);

    const typeWriterDataScienceHead = setInterval(() => {
      if (currentIndexDSH < dataScienecHeadingMessage.length) {
        currentTextDSH += dataScienecHeadingMessage[currentIndexDSH];
        setDataScienecHeading(currentTextDSH);
        currentIndexDSH++;
      } else {
        clearInterval(typeWriterDataScienceHead);
      }
    }, 50);

    const typeWriterDataScienceText = setInterval(() => {
      if (currentIndexDST < dataScienceTextMessage.length) {
        currentTextDST += dataScienceTextMessage[currentIndexDST];
        setdataScienceText(currentTextDST);
        currentIndexDST++;
      } else {
        clearInterval(typeWriterDataScienceText);
      }
    }, 50);

    return () => {
      clearInterval(typeWriterProgrammingHead);
      clearInterval(typeWriterProgrammingText);
      clearInterval(typeWriterDataScienceHead);
      clearInterval(typeWriterDataScienceText);
    };
  }, []);
    
    
  return (
    <section id="home" className="relative px-6 py-20 overflow-hidden text-white pt-28 md:pt-32 bg-acses-green-900 md:px-16">
      {/* Top Glow Effect */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-acses-yellow-500 to-acses-green-500 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-acses-yellow-500 to-acses-green-500 opacity-30 blur-3xl"></div>

      <div className="container flex flex-col items-center gap-24 mx-auto md:gap-48 md:flex-row">
        {/* Left Section - Text and Call to Action */}
        <div className="max-w-xl text-left">
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
            <div className="flex items-center justify-center h-full px-3 py-5 space-x-4 transition bg-white rounded-lg">
              {[
                {
                  link: "https://www.linkedin.com/in/acses-srid-068296343/",
                  // icon: "linkedin",
                  icon: Linkedin,
                  color: "blue-600",
                },
                {
                  link: "https://x.com/Acsessrid",
                  icon: "twitter",
                  color: "blue-400",
                },
                {
                  link: "https://www.instagram.com/acsessrid/",
                  // icon: "instagram",
                  icon: Instagram,
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
                  ) : social.icon === "tiktok" ? (
                    <i
                      className={`fab fa-${social.icon} w-[18px] h-[18px]`}
                    ></i>
                  ) : (
                    <social.icon className="w-5 h-5"/>
                  )}
                </motion.a>
              ))}
            </div>
            <a href="#about" className="px-6 py-3 font-medium transition border rounded-lg border-acses-yellow-500 text-acses-yellow-500 hover:bg-acses-yellow-400 hover:text-white">
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right Section - Futuristic Illustration and Image */}
        <motion.div
          className="relative flex items-center justify-center w-full max-w-xl mb-4 md:mb-0"
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
            className="absolute flex space-x-2 bottom-[-70px] md:bottom-[-20px] left-[-20px] w-[300px] bg-acses-green-800 text-acses-green-200 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <LucideCode size={32} className="mb-4 text-acses-yellow-500" />
            <div>
              <h3 className="text-lg font-bold">{programmingHeading}</h3>
              <p className="text-sm">{programmingText}</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute flex space-x-2 top-[-60px] md:top-[-20px] right-[-45px] w-[300px] bg-acses-green-800 text-acses-green-200 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <LucideDatabase size={32} className="mb-4 text-acses-yellow-500" />
            <div>
              <h3 className="text-lg font-bold">{dataScienecHeading}</h3>
              <p className="text-sm">{dataScienceText}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection01;
