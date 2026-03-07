/**
 * AcademicCard
 *
 * Displays a single academic resource with a title, description,
 * tag pills, and a "Learn More" link.
 *
 * Props:
 *  - title       {string}    Resource title.
 *  - description {string}    Short description of the resource.
 *  - tags        {string[]}  List of topic tag labels.
 *  - onLearnMore {function}  Optional click handler for "Learn More".
 */
const AcademicCard = ({ title, description, tags, onLearnMore }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4 h-full">
      <h3 className="font-bold text-gray-900 text-xl">{title}</h3>

      <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>

      {/* Tag Pills */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-white text-green-700 border border-green-200 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={onLearnMore}
        className="text-sm font-bold text-gray-900 hover:text-green-800 hover:underline text-left"
      >
        Learn More »
      </button>
    </div>
  );
};

export default AcademicCard;