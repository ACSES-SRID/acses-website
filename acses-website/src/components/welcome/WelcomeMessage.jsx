import React from "react";
import MessageCard from "./MessageCard"; 

const WelcomeMessage = () => {
  return (
    <section className="py-16 flex justify-center md:py-24">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Welcome to ACSES
        </h1>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* HOD Card */}
          <MessageCard
            title="Message from the HoD"
            name="Dr. Albert Kofi Kwansah Ansah"
            imageSrc="/images/lecturers/ansah.jpg"
            message="Welcome to the Association of Computer Science and Engineering Students (ACSES). Our department strives for excellence in education and research in the fields of Computer Science & Engineering, and Data Science & Analytics. We are committed to nurturing talented individuals who will shape the future of technology.
            As the Head of Department, I am proud to see the vibrant energy and enthusiasm that ACSS brings to our departmental activities. Your commitment to fostering a sense of community, promoting academic excellence, and providing a platform for students to explore their interests is truly commendable
            "
          />

          {/* President Card */}
          <MessageCard
            title="Message from the President"
            name="Lawson Buabassah"
            imageSrc="/images/executives/Lawson.jpg"
            message="As the President of ACSES, I welcome you to our vibrant community. Our association represents the diverse talents and aspirations of students in Computer Science, Engineering, and Data Science. Together, we create opportunities for growth, learning, and professional development."
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
