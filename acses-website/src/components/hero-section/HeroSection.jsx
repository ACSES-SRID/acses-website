import React from "react";
import Xlogo from '../xlogo/XLogo';

const HeroSection = () => {
  return (
    <section className="w-full flex justify-center pt-[120px] py-12 md:py-24 lg:py-32 xl:py-48 bg-acses-green-500 md:pt-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Association of Computer Science and Engineering Students, SRID
              </h1>
              <p className="max-w-[600px] text-white md:text-xl">
                Empowering future tech leaders through innovation,
                collaboration, and excellence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex justify-center items-center space-x-4 py-3 px-3 bg-white rounded-md h-full md:py-0">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-blue-600 transition-colors"
                >
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-blue-400 transition-colors"
                >
                  <Xlogo style={{ width: '18px', height: '18px' }} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-900 hover:text-black transition-colors"
                >
                  <i className="fab fa-tiktok fa-lg"></i>
                </a>
              </div>

              <a
                className="inline-flex h-10 py-4 items-center font-bold justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-acses-yellow-500 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="#about"
              >
                Learn More
              </a>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="550"
            src="/images/placeholder.svg?height=550&width=550"
            width="550"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
