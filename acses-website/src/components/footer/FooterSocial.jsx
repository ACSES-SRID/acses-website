import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import XLogo from "./XLogo";

const socialLinks = [
  { icon: <Linkedin className="w-5 h-5 text-white" />, href: "https://www.linkedin.com/in/acses-srid-068296343/", label: "LinkedIn" },
  { icon: <XLogo style={{ width: "18px", height: "18px" }} />, href: "https://x.com/Acsessrid", label: "X" },
  { icon: <Instagram className="w-5 h-5 text-white" />, href: "https://www.instagram.com/acsessrid/", label: "Instagram" },
  { icon: <i className="fab fa-tiktok w-[18px] h-[18px] text-white"></i>, href: "https://www.tiktok.com/@acsessrid1?_t=ZM-8spJTnaQtGv&_r=1", label: "TikTok" },
];

const FooterSocial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-acses-green-600 p-2 rounded-full hover:bg-acses-green-500 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.label} // For accessibility
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default FooterSocial;
