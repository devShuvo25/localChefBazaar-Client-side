import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import useAuth from "../hooks/authentication/useAuth";
import DetailsCard from "../components/cards/DetailsCard";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../components/Loader/Loader";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 const [reviewsLoading, setReviewsLoading] = useState(false);
 const [reviews, setReviews] = useState([]);
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();

  const { data: meal = {}, isLoading: mealLoading } = useQuery({
    queryKey: ["/meal", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/meal/${id}`);
        return res.data;
      } catch {
        return {};
      }
    },
  });
// handle favourite
const handleFavourite = (mealId) => {
    const favouriteData = {
        userEmail: user?.email,
        mealId: mealId
    }
    Swal.fire({
  title: "Are you sure?",
  text: "You want to add this meal to your favourites!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, add it!"
}).then((result) => {
  if (result.isConfirmed) {
  try {
    axiosSecure.post('/favourites',favouriteData)
    .then(res => {
        console.log("After hitting", res.data)
        if(res.data.insertedId){
           Swal.fire({
            title: "Added Successfully",
            text: "Your meal has been added to favourites.",
            icon: "success"
          });
        }
        else{
          Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Meals already in favourites!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
        }
      })
    
  }
  catch (error) {
    console.error("Error adding to favourites:", error);
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
  }
  }
})
  
}


 
  return (
    <div className="py-5 px-4  mx-auto">
      <div className="flex flex-col text-center items-center justify-center my-5">
        <h1 className="text-xl font-bold  lg:text-4xl text-primary"> Meal Details </h1>
        <p className="text-sm opacity-75">View complete information about this dish before placing your order.</p>
      </div>
      {mealLoading ? (
        <Loader/>
      ) : (
        <>
          <DetailsCard meal={meal} />

          {/* Reviews Section */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Reviews</h3>
              <div className="flex items-center gap-3">
                <button
             onClick={() => handleFavourite(meal?._id)}
                  className="btn btn-sm btn-outline"
                >
                  Add to Favorite
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reviewsLoading ? (
                <div>Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="text-gray-500">No reviews yet.</div>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="bg-white p-4 rounded shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={r.reviewerImage || "/assets/default-avatar.png"}
                        alt={r.reviewerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{r.reviewerName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < (r.rating || 0)
                              ? "text-accent"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm">{r.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Review Form */}
            <form
            //   onSubmit={handleSubmitReview}
              className="mt-6 p-4 rounded"
            >
              <h4 className="font-semibold mb-2">Give Review</h4>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm">Rating:</label>
                <select
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                // value={comment}
                // onChange={(e) => setComment(e.target.value)}
                className="textarea w-full mb-3"
                placeholder="Write your review"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                //   disabled={submitting}
                >
                  Post
                </button>
                <button
                  type="button"
                //   onClick={() => {
                //     setComment("");
                //     setRating(5);
                //   }}
                  className="btn btn-ghost"
                >
                  Reset
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default Details;
