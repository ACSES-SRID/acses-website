import { motion } from "framer-motion";
import mLogo from "/logo/logo1.png";

const FooterLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center space-y-4 mb-8 md:items-start md:hidden"
    >
      <div className="flex items-center space-x-3">
        <img src={mLogo} alt="ACSES Logo" className="w-12 h-12" />
        <div className="text-white">
          <h3 className="text-xl font-bold">ACSES</h3>
          <p className="text-xs text-gray-300">
          Association of Computer Science and Engineering Students - SRID, UMaT
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterLogo;
