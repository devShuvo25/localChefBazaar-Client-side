import React from "react";

/**
 * FeaturesCard
 * Reusable card component for feature tiles or compact meal/feature previews.
 * Props:
 * - icon: React node or emoji (optional)
 * - title: string
 * - description: string
 * - image: image URL (optional)
 * - ctaText: string (optional)
 * - onCtaClick: function (optional)
 */
const FeaturesCard = ({
  icon,
  title,
  description,
  image,
  ctaText,
  onCtaClick,
}) => {
  return (
    <article className="bg-neutral rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
      {image && (
        <div className="h-40 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {icon && <div className="text-3xl">{icon}</div>}
          <h3 className="text-lg font-bold text-secondary">{title}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

        {ctaText && (
          <div className="pt-2">
            <button onClick={onCtaClick} className="btn btn-sm btn-primary">
              {ctaText}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default FeaturesCard;
