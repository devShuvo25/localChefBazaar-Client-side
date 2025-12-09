import { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import userDemoImage from "../../assets/man.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/authentication/useAuth";
import useAxiosSecure from "../../axios/useAxiosSecure";

const ReviewCard = ({ review ,refetch,isMyReview,handleEditReview }) => {
  const { user } = useAuth();
  const {_id, reviewerImage, mealImage, reviewerName, reviewerEmail, comment, rating, date } =
    review || {};

  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const containerRefs = useRef([]);
  const {axiosSecure} = useAxiosSecure()
  

  // Toggle dropdown
  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
      const handleDeletReview = async (id) => {
        if(id){
            try{
          const res =  await  axiosSecure.delete(`/reviews/${id}`)
          console.log(res.data);
          refetch()
          setOpenIndex(null)
            }
            catch(error){
                console.log(error);
            }
        }

    }
    // review edit function
    // const handleEditReview = (id) => {
    //   console.log("clicked for edit",id);
    // }
  return (
    <div
      className="w-full bg-white shadow-md rounded-xl p-4 flex gap-4 relative"
      ref={containerRef}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={ isMyReview? mealImage : reviewerImage || userDemoImage}
          alt={reviewerName}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base">{reviewerName}</h3>
          <span className="text-xs text-gray-500">{date?.split("T")[0]}</span>
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

        {/* Comment + Menu Icon */}
        <div className="flex justify-between items-center relative">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {comment}
          </p>

          {/* 3-dot menu (only for owner) */}
          {user?.email === reviewerEmail && (
            <BsThreeDotsVertical
              className="cursor-pointer ml-2"
              onClick={toggleDropdown}
            />
          )}

          {/* Dropdown (Animated) */}
          <AnimatePresence>
            {open && (
              <motion.ul
                ref={dropdownRef}
                key="dropdown"
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-8 dropdown-content menu bg-base-100 rounded-lg w-40 p-2 shadow-lg border z-50"
              >
                <li onClick={() => handleEditReview(_id,rating,comment)}><a>Edit Review</a></li>
                <li onClick={() =>handleDeletReview(_id)} ><a className="text-red-500">Delete Review</a></li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
