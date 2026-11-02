import { useState, useEffect } from "react";
import MessageCard from "./MessageCard";
import { fetchApi } from "../../../utils/api";

const WelcomeMessage = () => {
  const [president, setPresident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresident = async () => {
      try {
        const data = await fetchApi("/api/leadership");
        const list = Array.isArray(data) ? data : [];
        const pres = list.find((leader) =>
          leader.role?.toLowerCase().includes("president")
        );
        setPresident(pres);
      } catch (error) {
        console.error("Failed to fetch president data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPresident();
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-8 sm:mb-10 md:mb-12">
          Welcome to ACSES
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* HOD Card */}
          <div className="h-full flex">
            <MessageCard
              title="Message from the HoD"
              name="Engr Dr Albert Kofi Kwansah Ansah"
              imageSrc="/images/lecturers/ansah.jpg"
              message="Welcome to the Association of Computer Science and Engineering Students (ACSES). Our department strives for excellence in education and research in the fields of Computer Science & Engineering, and Data Science & Analytics. We are committed to nurturing talented individuals who will shape the future of technology.

As the Head of Department, I am proud to see the vibrant energy and enthusiasm that ACSES brings to our departmental activities. Your commitment to fostering a sense of community, promoting academic excellence, and providing a platform for students to explore their interests is truly commendable."
            />
          </div>

          {/* President Card - Dynamic / skeleton */}
          <div className="h-full flex">
            {loading ? (
              <div className="w-full rounded-2xl border bg-muted/30 animate-pulse min-h-[300px]" />
            ) : (
              president && (
                <MessageCard
                  title="Message from the President"
                  name={president.name}
                  imageSrc={president.image}
                  message="As the President of ACSES, I welcome you to our vibrant community. Our association represents the diverse talents and aspirations of students in Computer Science, Engineering, and Data Science. Together, we create opportunities for growth, learning, and professional development."
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;