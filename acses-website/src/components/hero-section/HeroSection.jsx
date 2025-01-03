import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 xl:py-48 bg-acses-green-500">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Association of Computer Science and Engineering Students
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Empowering future tech leaders through innovation,
                collaboration, and excellence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="#contact"
              >
                Join ACSES
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
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
