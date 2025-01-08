import { motion } from "framer-motion";
import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import { BookOpen, GraduationCap, Users, FileText, Phone } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "#about", icon: Users },
  { label: "Programs", href: "#programs", icon: BookOpen },
  { label: "Academics", href: "#academics", icon: GraduationCap },
  { label: "Resources", href: "#resources", icon: FileText },
  { label: "Contact", href: "#contact", icon: Phone },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-acses-green-800 to-acses-green-900 w-full">
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <FooterLogo />
            <FooterLinks title="Quick Links" links={quickLinks} />
            <FooterLinks
              title="Resources"
              links={[
                { label: "Student Portal", href: "#" },
                { label: "E-Library", href: "#" },
                { label: "Research Papers", href: "#" },
                { label: "Course Materials", href: "#" },
              ]}
            />
            <FooterSocial />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-300">
                © {new Date().getFullYear()} ACSES. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
