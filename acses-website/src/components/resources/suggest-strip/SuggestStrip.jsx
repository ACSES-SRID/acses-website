/**
 * SuggestStrip
 *
 * A simple bottom strip prompting users to suggest a resource.
 *
 * Props:
 *  - onSuggest {function}  Optional click handler for "Suggest a resource".
 */
const SuggestStrip = ({ onSuggest }) => {
  return (
    <div className="text-center py-8 border-t border-gray-200">
      <span className="text-base text-gray-600">Have a resource to share? </span>
      <button
        onClick={onSuggest}
        className="text-base font-semibold text-green-800 hover:underline"
      >
        Suggest a resource
      </button>
    </div>
  );
};

export default SuggestStrip;