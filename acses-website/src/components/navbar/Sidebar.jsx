import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Info, Calendar, Newspaper, Users, Mail } from 'lucide-react';
import mLogo from '@/assets/react.svg';

const Sidebar = ({ isOpen, onClose, navItems }) => {
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        delay: 0.2
      }
    },
    open: {
      opacity: 1
    }
  };

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl md:hidden z-50 sidebar"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex justify-between items-center p-6 border-b">
				<NavLink 
					to="/"
					className="flex items-center space-x-3 text-blue-600 font-bold text-2xl tracking-tight hover:text-blue-700 transition-colors duration-200"
				  >
				  {/*<Code className="w-8 h-8" />*/}
				 <img 
					src= {mLogo}
					alt="ACSES Logo" 
					className="w-8 h-8"
				  />
					<span>ACSES</span>
				  </NavLink>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                {navItems.map(({ name, icon, index }) => (
                  <motion.div
                    key={name}
                    variants={menuItemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
					<NavLink
					  to={name === 'Home' ? '/' : `/${name.toLowerCase()}`}
					  onClick={onClose}
					  className={({ isActive }) =>
						`flex items-center px-4 py-3 rounded-lg text-lg font-medium 
						 transition-all duration-200 mb-2 ${
						  isActive
							? 'text-blue-600 bg-blue-50'
							: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
						}`
					  }
					>
					  <div className="flex items-center space-x-2">
						{icon}
						<span>{name}</span>
					  </div>
					</NavLink>

                  </motion.div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t">
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-lg
                                hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;