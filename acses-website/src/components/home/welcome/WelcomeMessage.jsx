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
              message="Welcome to ACSES! We pursue excellence in education and research across Computer Science & Engineering and Data Science & Analytics, shaping future technology leaders.

              As Head of Department, I'm proud of the energy ACSES brings to our activities, your commitment to community and academic excellence is truly commendable."
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