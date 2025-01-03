import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Code, Info, Calendar, Newspaper, Users, Mail } from 'lucide-react';
import Sidebar from './Sidebar';
import mLogo from '@/assets/react.svg';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

const navItems = [
  { name: 'About', icon: <Info className="w-5 h-5 mr-2" /> },
  { name: 'Events', icon: <Calendar className="w-5 h-5 mr-2" /> },
  { name: 'News', icon: <Newspaper className="w-5 h-5 mr-2" /> },
  { name: 'Team', icon: <Users className="w-5 h-5 mr-2" /> },
  { name: 'Contact', icon: <Mail className="w-5 h-5 mr-2" /> },
];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && !e.target.closest('.sidebar') && !e.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}
    >
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink 
            to="/"
            className="flex items-center space-x-3 text-acses-green-600 font-bold text-2xl tracking-tight hover:text-blue-700 transition-colors duration-200"
          >
		  {/*<Code className="w-8 h-8" />*/}
		 <img 
			src= {mLogo}
			alt="ACSES Logo" 
			className="w-8 h-8"
		  />
            <span>ACSES</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(({ name, icon }) => (
              <NavLink
                key={name}
                to={name === 'Home' ? '/' : `/${name.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-acses-green-600 transition-colors duration-200 
                   py-2 px-3 lg:px-4 rounded-md text-base lg:text-lg font-medium relative group 
                   hover:bg-acses-green-50 ${
                    isActive ? 'text-acses-green-600 bg-acses-green-50' : ''
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
            ))}
            <button className="px-6 py-2.5 bg-acses-green-600 text-white rounded-full font-medium text-base lg:text-lg
                             hover:bg-acses-green-700 transition-colors duration-200 transform hover:scale-105">
              Sign In
            </button>
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