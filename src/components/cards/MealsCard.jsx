import React from "react";
import { FaStar, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/authentication/useAuth";
import Swal from "sweetalert2";
const MealsCard = ({ meal = {},isFavourite ,refetch}) => {
  const {axiosSecure} = useAxiosSecure()
  const navigate = useNavigate()
  // const {} = useQuery()
  const {user} = useAuth()
  
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
  } = meal;
  console.log(isFavourite);
    
  const handleRemoveFromFavourites=(_id)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "Do you want to remove this item from your favourites list?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
.then(result => {
  if(result.isConfirmed){
        axiosSecure.delete(`/favourite-meals?id=${_id}&userEmail=${user?.email}`)
    .then(res=>{
        console.log("Deleted Response", res.data)
        if(res.data.deletedCount){
           Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
        }
        refetch();
    })
  }
})

}






  const handleActions = (_id) => {
    if(!isFavourite){
      return navigate(`/details/${_id}`);
    }
    handleRemoveFromFavourites(_id)

  }
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="relative h-44 bg-gray-100">
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

        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full flex items-center gap-2">
          <FaStar className="text-accent" />
          <span className="font-semibold">{rating ?? "-"}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-secondary mb-1">{foodName}</h3>
        <p className="text-sm text-gray-600 mb-2">
          By <span className="font-semibold">{chefName}</span> •{" "}
          {chefExperience ?? "--"} yrs
        </p>

        <div className="flex items-center justify-between mb-3">
          <p className="text-primary font-bold">৳{price ?? "--"}</p>
          <div className="text-xs text-gray-500 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-primary" />{" "}
              {deliveryArea ?? "---"}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-primary" />{" "}
              {estimatedDeliveryTime ?? "--"}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {Array.isArray(ingredients)
            ? ingredients.join(", ")
            : ingredients || "Ingredients not listed"}
        </p>

        <div className="flex gap-2">
          <Link
          to={`/order/${_id}`}
            
            className="btn btn-primary flex-1"
            aria-label={`Order ${foodName}`}
          >
            Order Now
          </Link>
          <button 
            onClick={() =>handleActions(_id)}
            className="btn btn-ghost"
            
           
          >
            {isFavourite? "Remove" : "View Details"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MealsCard;
