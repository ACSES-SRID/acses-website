import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  Home,
  Info,
  Calendar,
  Newspaper,
  Users,
  Mail,
} from "lucide-react";
import Sidebar from "./Sidebar";
import mLogo from "/logo/logo.jpg";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll to the section when the hash changes
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  const navItems = [
    { name: "Home", link: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "About", link: "#about", icon: <Info className="w-5 h-5 mr-2" /> },
    {
      name: "Events",
      link: "#events",
      icon: <Calendar className="w-5 h-5 mr-2" />,
    },
    {
      name: "Executives",
      link: "/executives",
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      name: "Gallery",
      link: "/gallery",
      icon: <Newspaper className="w-5 h-5 mr-2" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Mail className="w-5 h-5 mr-2" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (
        isOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-3 text-acses-green-500 font-bold text-3xl tracking-tight hover:text-acses-green-600 transition-colors duration-200"
          >
            {/*<Code className="w-8 h-8" />*/}
            <img src={mLogo} alt="ACSES Logo" className="w-[60px] h-[60px]" />
            <div className="flex flex-col items-center w-[120px] leading-tight">
              <span>ACSES</span>
              <span className="text-acses-green-600 text-center text-[8px]">
                Association of Computer Science and Engineering Students - SRID,
                UMaT
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(({ name, link, icon }) => {
              // Ensure hash links start with a slash to prevent appending
              const normalizedLink = link.startsWith("#") ? `/${link}` : link;

              // Determine active state for links
              const isActive = link.startsWith("#")
                ? location.hash === link
                : location.pathname === link && !location.hash; // Only match "/" if there's no hash

              return (
                <NavLink
                  key={name}
                  to={normalizedLink}
                  className={() =>
                    `text-gray-600 hover:text-acses-green-600 transition-colors duration-200 
               py-2 px-3 lg:px-4 rounded-md text-base lg:text-lg font-medium relative group 
               hover:bg-acses-green-50 ${
                 isActive ? "text-acses-green-600 bg-acses-green-50" : ""
               }`
                  }
                >
                  {name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-acses-green-600 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="md:hidden flex items-center text-acses-green-600 hover:text-acses-green-600 transition-colors duration-200 menu-button"
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
      />
    </motion.nav>
  );
};

export default NavBar;
