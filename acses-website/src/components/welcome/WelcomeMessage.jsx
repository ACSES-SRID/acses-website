import React from "react";

const WelcomeMessage = () => {
  return (
    <section className="py-16 flex justify-center md:py-24">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Welcome to ACSES
        </h1>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Card for HOD */}
          <div className="w-full border rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  src="/images/placeholder.svg"
                  alt="HOD"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Message from the HOD</h2>
                <p className="text-sm text-gray-500">Prof. John Smith</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600">
                Welcome to the Association of Computer Science and Engineering Students (ACSES).
                Our department strives for excellence in education and research in the fields of
                Computer Science, Engineering, and Data Science. We are committed to nurturing
                talented individuals who will shape the future of technology.
              </p>
            </div>
          </div>
          {/* Card for President */}
          <div className="w-full border rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  src="/images/placeholder.svg"
                  alt="President"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Message from the President</h2>
                <p className="text-sm text-gray-500">Jane Doe</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600">
                As the President of ACSES, I welcome you to our vibrant community.
                Our association represents the diverse talents and aspirations of students
                in Computer Science, Engineering, and Data Science. Together, we create
                opportunities for growth, learning, and professional development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
