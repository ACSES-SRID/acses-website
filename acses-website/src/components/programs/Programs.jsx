import { Code2, Database } from "lucide-react";
import ProgramCard from "./ProgramCard";

const Programs = () => {
  return (
    <section id="programs" className="flex justify-center py-16 md:py-24 bg-gradient-to-br from-acses-green-800 via-acses-green-700 to-acses-green-900">
      <div className="container px-6 md:px-32">
        <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-center text-acses-yellow-50 sm:text-5xl md:text-6xl">
          Explore Our Programs
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Program Card: Computer Science & Engineering */}
          <ProgramCard 
            icon={<Code2 className="w-10 h-10 text-white" />} 
            title="Computer Science & Engineering" 
            description="Our Computer Science & Engineering program offers a comprehensive curriculum that combines theoretical foundations with practical applications. Students learn software development, computer systems, algorithms, and more." 
            lists={["Software Engineering", "Computer Networks", "Artificial Intelligence", "Operating Systems", "Web Development"]} 
          />

          {/* Program Card: Data Science & Analytics */}
          <ProgramCard 
            icon={<Database className="w-10 h-10 text-white" />} 
            title="Data Science & Analytics" 
            description="The Data Science & Analytics program equips students with the skills to analyze and interpret complex data. Students learn statistical methods, machine learning, and data visualization techniques." 
            lists={["Machine Learning", "Statistical Analysis", "Big Data Processing", "Data Visualization", "Predictive Modeling"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Programs;
