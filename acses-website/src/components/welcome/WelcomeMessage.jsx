import React from "react";
import MessageCard from "./MessageCard"; 

const WelcomeMessage = () => {
  return (
    <section className="py-16 flex justify-center md:py-24 bg-acses-yellow-500">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Welcome to ACSES
        </h1>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* HOD Card */}
          <MessageCard
            title="Message from the HOD"
            name="Prof. John Smith"
            imageSrc="/images/placeholder.svg"
            message="Welcome to the Association of Computer Science and Engineering Students (ACSES). Our department strives for excellence in education and research in the fields of Computer Science, Engineering, and Data Science. We are committed to nurturing talented individuals who will shape the future of technology."
          />

          {/* President Card */}
          <MessageCard
            title="Message from the President"
            name="Jane Doe"
            imageSrc="/images/placeholder.svg"
            message="As the President of ACSES, I welcome you to our vibrant community. Our association represents the diverse talents and aspirations of students in Computer Science, Engineering, and Data Science. Together, we create opportunities for growth, learning, and professional development."
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
