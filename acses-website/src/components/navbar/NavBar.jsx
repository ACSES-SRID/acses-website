import React from "react";
import { GraduationCap } from 'lucide-react'

const NavBar = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <a className="flex items-center justify-center" href="#">
        <GraduationCap className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">ACSES</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#home"
        >
          Home
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#about"
        >
          About
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#events"
        >
          Events
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/gallery"
        >
          Gallery
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/executives"
        >
          Executives
        </a>
        <a
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default NavBar;
