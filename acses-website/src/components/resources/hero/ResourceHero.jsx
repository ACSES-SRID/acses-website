import { FILTERS } from "../../../data/ResourcesData";

const ResourceHero = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="text-center px-4 pb-10">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Resources</h1>
      <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
        Explore our range of academic, professional and extracurricular initiatives
        designed to prepare you for the future of tech.
      </p>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter
                ? "bg-green-700 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-green-600 hover:text-green-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceHero;