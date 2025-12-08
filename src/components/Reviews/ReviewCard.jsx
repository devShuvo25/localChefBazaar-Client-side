import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaStar } from "react-icons/fa";
import userDemoImage from '../../assets/man.png'
import useAxiosSecure from "../../axios/useAxiosSecure";
import useAuth from "../../hooks/authentication/useAuth";

const ReviewCard = ({review}) => {
const {user} = useAuth();
   const {_id,reviewerImage,reviewerName,comment,rating,date} = review || {}
  return (
    <div className="w-full  bg-white shadow-md rounded-xl p-4 flex gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={reviewerImage || userDemoImage}
          alt={reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Name + Time */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base sm:text-lg">{reviewerName}</h3>
          <span className="text-xs text-gray-500">{date.split('T')[0]}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 my-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={14}
              className={i < rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="text-sm font-medium ml-1">{rating}.0</span>
        </div>

        {/* Comment */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
