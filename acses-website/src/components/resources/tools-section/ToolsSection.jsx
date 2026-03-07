import { tools } from "../../../data/ResourcesData";

/**
 * ToolsSection
 *
 * Renders the Tools & Platforms panel with an icon grid.
 * Tool data (names + icon components) is sourced from ResourcesData.
 *
 * Props:
 *  - onLearnMore {function}  Optional click handler for "Learn More".
 */
const ToolsSection = ({ onLearnMore }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools & Platforms</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {tools.map(({ id, name, Icon }) => (
          <div
            key={id}
            className="flex flex-col items-center gap-3 py-6 rounded-xl border border-gray-100
                       hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
          >
            <Icon />
            <span className="text-sm font-semibold text-gray-700">{name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onLearnMore}
        className="text-sm font-bold text-gray-900 hover:text-green-800 hover:underline mt-6 block"
      >
        Learn More »
      </button>
    </div>
  );
};

export default ToolsSection;