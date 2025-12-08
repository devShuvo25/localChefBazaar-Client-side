import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import useAuth from "../hooks/authentication/useAuth";
import DetailsCard from "../components/cards/DetailsCard";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../components/Loader/Loader";
import CustommerReviews from "../components/Reviews/CustommerReviews";
// import ReviewCard from "../components/Reviews/CustommerReviewsInDetails";
import { useForm } from "react-hook-form";
import ReviewCard from "../components/Reviews/ReviewCard";

const Details = () => {
  const { id } = useParams();
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
      mealId: mealId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this meal to your favourites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.post("/favourites", favouriteData).then((res) => {
            console.log("After hitting", res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Added Successfully",
                text: "Your meal has been added to favourites.",
                icon: "success",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Meals already in favourites!",
                footer: '<a href="#">Why do I have this issue?</a>',
              });
            }
          });
        } catch (error) {
          console.error("Error adding to favourites:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      }
    });
  };
  const {data: reviews =[],refetch} = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews')
            return res.data
        }
    })
      const { register, handleSubmit } = useForm();
  const handlePostReview = (data) => {
    if (data) {
      const reviewInfo = {
        mealId: id,
        reviewerName: user?.displayName,
        reviewerImage: user?.photoURL,
        rating: data.rating,
        comment: data.comment,
        date: new Date(),
      };
      try{
     axiosSecure.post('/reviews',reviewInfo)
     .then(res=> {
      console.log(res.data);
      refetch()
     })


      }
      catch{
        console.log('Something went wrong')
      }
    }
  };
  return (
    <div className="py-5 px-4  mx-auto">
      <div className="flex flex-col text-center items-center justify-center my-5">
        <h1 className="text-xl font-bold  lg:text-4xl text-primary">
          {" "}
          Meal Details{" "}
        </h1>
        <p className="text-sm opacity-75">
          View complete information about this dish before placing your order.
        </p>
      </div>
      {mealLoading ? (
        <Loader />
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
            {/* <CustommerReviews/> */}
            <div>
        <div className="flex justify-center items-center flex-col py-5">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              What Our <span className="text-primary">Customers</span> Say
            </h2>
            <p className="text-secondary">
              Real reviews from satisfied customers
            </p>
        </div>
        <div className="flex flex-col gap-3 lg:gap-5 items-center justify-center">
          {reviews.map(review => <ReviewCard review={review}/>)}
        </div>
        
    </div>
            {/* <CustommerReviews/> */}
            {/* review */}
            <div>
              <div></div>
            </div>
            {/* Add Review Form */}
            <form
              //   onSubmit={handleSubmitReview}
              className="mt-6 p-4 rounded"
            >
              <h4 className="font-semibold mb-2">Give Review</h4>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm">Rating:</label>
                <select {...register("rating", { required: true })}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                {...register("comment", { required: true })}
                className="textarea w-full mb-3"
                placeholder="Write your review"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(handlePostReview)}
                  className="btn btn-primary"
                >
                  Post
                </button>
                <button type="button" className="btn btn-ghost">
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
