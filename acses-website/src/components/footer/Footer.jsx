import { motion } from "framer-motion";
import FooterLogo from "./FooterLogo";
import FooterLogo1 from "./FooterLogo1";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import { BookOpen, GraduationCap, Users, FileText, CreditCard, AtSign } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "#about", icon: Users },
  { label: "Programs", href: "#programs", icon: BookOpen },
  { label: "Resources", href: "#resources", icon: FileText },
  { label: "E-Voting Platform", href: "https://acses-e-voting-frontend.vercel.app", icon: AtSign },
  { label: "Payment Gateway", href: "https://payments.acsessrid.com", icon: CreditCard },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-acses-green-800 to-acses-green-900 w-full">
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FooterLogo />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <FooterLogo1 />
            <FooterLinks title="Quick Links" links={quickLinks} />
            <FooterLinks
              title="Resources"
              links={[
                { label: "Student Portal", href: "https://portal.umat.edu.gh/students/" },
                { label: "E-Library", href: "https://library.umat.edu.gh/" },
                { label: "UMaT VLE", href: "https://elearning.umat.edu.gh/" },
                { label: "Course Materials", href: "https://elearning.umat.edu.gh/" },
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
              <div className="flex text-white text-center font-bold">
                <span className="font-normal pr-2">Launched by</span> BUABASSAH-BOAFO LED ADMINISTRATION
              </div>
              <p className="text-sm text-gray-300">
                © {new Date().getFullYear()} ACSES. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
