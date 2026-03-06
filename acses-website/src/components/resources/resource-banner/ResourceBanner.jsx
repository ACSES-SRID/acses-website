/**
 * ResourceBanner
 *
 * A reusable dark-green banner used as a section header.
 *
 * Props:
 *  - title      {string}        Required. Main heading text.
 *  - subtitle   {string}        Optional. Supporting text below the title.
 *  - linkLabel  {string}        Optional. CTA link label (e.g. "View Resources »").
 *  - onLinkClick {function}     Optional. Handler for the CTA link.
 */
const ResourceBanner = ({ title, subtitle, linkLabel, onLinkClick }) => {
  return (
    <div className="rounded-2xl bg-green-800 text-white px-10 py-10">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>

      {subtitle && (
        <p className="text-green-200 text-base max-w-md leading-relaxed">{subtitle}</p>
      )}

      {linkLabel && (
        <button
          onClick={onLinkClick}
          className="mt-5 text-base font-semibold text-white flex items-center gap-1 hover:underline"
        >
          {linkLabel} <span>›</span>
        </button>
      )}
    </div>
  );
};

export default ResourceBanner;