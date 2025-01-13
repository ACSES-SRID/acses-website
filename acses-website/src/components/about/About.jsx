import React from "react";

const About = () => {
  return (
    <section id="about" className="w-full flex justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              About ACSES
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              ACSES is a student-led group dedicated to fostering
              academic excellence, professional development, and community
              engagement in the field of computer science and engineering.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Our Mission</h3>
                  <p className="text-gray-500">
                    To create a vibrant community that promotes learning,
                    innovation, and professional growth among Computer Science
                    & Engineering and Data Science & Analytics students.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Our Vision</h3>
                  <p className="text-gray-500">
                    To be the leading student organization that bridges academic
                    excellence with industry readiness in computer science and
                    engineering.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Our Values</h3>
                  <p className="text-gray-500">
                    Innovation, collaboration, integrity, and excellence in all
                    our endeavors.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <img
            alt="About ACSES"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="310"
            src="/images/placeholder.svg?height=350&width=600"
            width="550"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
