import { motion } from 'framer-motion';
import mLogo from "/logo/logo.jpg";

const FooterLogo = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center space-y-4 md:items-start"
    >
      <div className="flex items-center space-x-3">
        <img src={mLogo} alt="ACSES Logo" className="w-12 h-12" />
        <div className="text-white">
          <h3 className="text-xl font-bold">ACSES</h3>
          <p className="text-xs text-gray-300">Association of Computer Science and Engineering Students</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 max-w-xs text-center md:text-left">
        Empowering future tech leaders through innovation, collaboration, and excellence.
      </p>
    </motion.div>
  );
};

export default FooterLogo;