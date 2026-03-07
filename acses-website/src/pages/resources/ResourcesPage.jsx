import { useState } from "react";

// Data
import { academicResources, careerResources } from "../../data/ResourcesData";

// Components
import ResourceHero     from "../../components/resources/hero/ResourceHero";
import ResourceBanner   from "../../components/resources/resource-banner/ResourceBanner";
import AcademicCard     from "../../components/resources/academic-card/AcademicCard";
import ToolsSection     from "../../components/resources/tools-section/ToolsSection";
import CareerCard       from "../../components/resources/career-card/CareerCard";
import SuggestStrip     from "../../components/resources/suggest-strip/SuggestStrip";

const ResourcesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const showAcademic = activeFilter === "All" || activeFilter === "Academic Materials";
  const showTools    = activeFilter === "All" || activeFilter === "Tools & Platforms";
  const showCareer   = activeFilter === "All" || activeFilter === "Career & Internships";

  return (
    // pt-24 offsets the fixed NavBar from RouteLayout.
    // No min-h-screen — RouteLayout's <main className="flex-1"> owns the height.
    <div className="bg-gray-50 pt-24 pb-20">

      {/* ── Hero + Filter Tabs ── */}
      <ResourceHero
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* ── Page Sections ── */}
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* Data Science Banner */}
        {showAcademic && (
          <ResourceBanner
            title="Data Science Resources"
            subtitle="Level up with these essential tools and platforms that can enhance your data science skills."
            linkLabel="View Resources"
            onLinkClick={() => {}}
          />
        )}

        {/* Academic Materials Grid */}
        {showAcademic && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {academicResources.map((resource) => (
                <AcademicCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  tags={resource.tags}
                  onLearnMore={() => {}}
                />
              ))}
            </div>
          </section>
        )}

        {/* Tools & Platforms */}
        {showTools && (
          <section>
            <ToolsSection onLearnMore={() => {}} />
          </section>
        )}

        {/* Career & Internships */}
        {showCareer && (
          <section>
            <ResourceBanner title="Career & Internships Corner" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
              {careerResources.map((resource) => (
                <CareerCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  onLearnMore={() => {}}
                />
              ))}
            </div>
          </section>
        )}

        {/* Suggest a Resource */}
        <SuggestStrip onSuggest={() => {}} />

      </div>
    </div>
  );
};

export default ResourcesPage;