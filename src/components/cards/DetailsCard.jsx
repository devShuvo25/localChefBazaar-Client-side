import React from "react";
import { Link } from "react-router";

const DetailsCard = ({ meal = {} }) => {
  const {
    _id,
    foodName,
    chefName,
    foodImage,
    price,
    rating,
    ingredients,
    deliveryArea,
    estimatedDeliveryTime,
    chefExperience,
    chefId,
  } = meal;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="h-64 bg-gray-100 rounded overflow-hidden">
            {foodImage ? (
              <img
                src={foodImage}
                alt={foodName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-secondary mb-2">{foodName}</h2>
          <p className="text-sm text-gray-600 mb-4">
            By <span className="font-semibold">{chefName}</span> •{" "}
            {chefExperience ?? "--"} yrs • Chef ID:{" "}
            <span className="font-mono">{chefId}</span>
          </p>

          <div className="flex items-center gap-6 mb-4">
            <p className="text-2xl font-bold text-primary">৳{price}</p>
            <p className="text-sm text-gray-600">
              Rating: <strong className="text-accent">{rating ?? "-"}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Delivery: {deliveryArea ?? "-"}
            </p>
            <p className="text-sm text-gray-600">
              ETA: {estimatedDeliveryTime ?? "--"} mins
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Ingredients</h4>
            <p className="text-sm text-gray-700">
              {Array.isArray(ingredients)
                ? ingredients.join(", ")
                : ingredients || "Not listed"}
            </p>
          </div>

          <div className="flex gap-3">
            <Link to={`/order/${_id}`} className="btn btn-primary">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
