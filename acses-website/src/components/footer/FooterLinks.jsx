/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const FooterLinks = ({ title, links }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
            >
              {link.icon && <link.icon className="w-4 h-4 mr-2" />}
              {link.label}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterLinks;
