/**
 * CareerCard
 *
 * Displays a single career or internship resource with a title,
 * short description, and a "Learn More" link.
 *
 * Props:
 *  - title       {string}    Resource title.
 *  - description {string}    Short description of the resource.
 *  - onLearnMore {function}  Optional click handler for "Learn More".
 */
const CareerCard = ({ title, description, onLearnMore }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 h-full">
      <h3 className="font-bold text-gray-900 text-base">{title}</h3>

      <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>

      <button
        onClick={onLearnMore}
        className="text-sm font-bold text-gray-900 hover:text-green-800 hover:underline text-left"
      >
        Learn More »
      </button>
    </div>
  );
};

export default CareerCard;