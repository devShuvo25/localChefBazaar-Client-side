import { motion } from "framer-motion";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import useAuth from "../hooks/authentication/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUserData from "../hooks/userRole/useRole";

const OrderMeal = () => {
  const [quantity, setQuantity] = useState(1);
  const { axiosSecure } = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const {status} = useUserData()
  const today = new Date();
  const delivaryTime = new Date(today);
  delivaryTime.setDate(today.getDate() + 3);
  const {register,handleSubmit} = useForm()
  const { data: orderedMeal = {} } = useQuery({
    queryKey: ["orderedmeal"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/meal/${id}`);
        return res.data;
      } catch {
        console.error("Failed to fetch meal data");
      }
    },
  });
    const { foodName, chefId= 'CH-112', foodImage, price } = orderedMeal || {};
      const totalPrice = price * quantity + 40;
  // confirm delivary order
  const handleConfirmOrder = (data) => {
    const orderInfo = {
      mealId : id,
      mealName : orderedMeal.foodName,
      mealImage : orderedMeal.foodImage,
      chefId,
      price : orderedMeal.price,
      quantity,
      orderTime: new Date(),
      totalPrice : orderedMeal.price * quantity + 40,
      paymentStatus : "Pending",
      orderStatus : "Pending",
      orderDate : new Date().toISOString().split("T").join(", "),
      delivaryDate : delivaryTime,
      userEmail : data.userEmail,
      userName : data.userName,
      userAddress : data.userAddress,
    }
    if(user && orderInfo){
      try{
        Swal.fire({
          title: `Do you want to confirm the order?`,
          text: `Your total Price is: ${totalPrice} ৳`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Confirm"
        }) 
        .then(result => {
          if(result.isConfirmed && status !=="Fraud"){
             axiosSecure.post('/orders',orderInfo)
        .then(res=>{
          if(res.data.insertedId){
            Swal.fire({
      title: "Placed Order",
      text: "Your order successfully placed",
      icon: "success"
    });
          }

        })
          }
          else{
            Swal.fire({
  icon: "error",
  title: "Order Blocked",
  text: "Your account has been marked as fraud. You cannot place orders at this time.",
});

          }

            
          
        })
       
      }
      catch(err){
        console.error("Failed to place order",err);
      }
  }
}
  console.log(orderedMeal);


  console.log(orderedMeal);
  return (
    <div className="bg-habit-bg min-h-screen text-habit-text px-3 sm:px-4 md:px-6 py-10">
      <title>Order Meal</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-habit-primary mb-3">
          Confirm Your <span className="text-primary">Meal Order</span>
        </h1>
        <p className="text-habit-text/70 text-sm md:text-base">
          Fill in your delivery info and confirm the order.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* LEFT SIDE - FORM */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-6">
          {/* ========== MEAL INFO ========== */}
          <div className="flex   items-start sm:items-center justify-between gap-4 border-b pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <img
                src={foodImage}
                alt={foodName}
                className="w-full sm:w-24 h-40 sm:h-24 rounded-lg object-cover"
              />

              <div>
                <h2 className="text-lg md:text-xl font-bold">{foodName}</h2>
                <p className="text-sm opacity-70">Prepared by Chef Rahim</p>
                <p className="text-primary font-semibold mt-1">৳ {price}</p>
              </div>
            </div>
                            <div className="flex items-center gap-6 bg-gray-100 px-2 py-1 rounded-full mx-auto sm:mx-0">
                  <button

                    type="button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="text-primary text-lg cursor-pointer"
                  >
                    <FaMinus />
                  </button>

                  <span className="font-bold text-lg">{quantity}</span>

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-primary text-lg cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                </div>

            {/* <div className="flex flex-col items-end  sm:items-end text-sm gap-1">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-xs sm:text-sm">
                Pending
              </span>
              <span className="text-xs text-gray-500">Chef ID : {chefId}</span>
              <div className="flex flex-col sm:flex-row items-end justify-between gap-3">

              </div>
            </div> */}
          </div>

          {/* ========== CUSTOMER INFO ========== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                Your Name
              </label>
              <input
                type="text"
                
                defaultValue={user?.displayName}
                placeholder="Enter your name"
                className="input w-full outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">
                Your email address
              </label>
              <input
              {...register("userEmail",{required:true})}
                type="email"
                defaultValue={user?.email}
                placeholder="user@gmail.com"
                className="input w-full outline-none"
                required
              />
            </div>
          </div>

          {/* ========== DELIVERY INFO ========== */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Delivery Address
            </label>
            <textarea
            {...register("userAddress",{required:true})}
              rows="3"
              placeholder="Enter your full delivery address"
              className="textarea w-full outline-none resize-none"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                Select Area
              </label>
              <select {...register('userArea')} className="select w-full outline-none">
                <option>Dhaka</option>
                <option>khulna</option>
                <option>Rajhshahi</option>
                <option>Barishal</option>
                <option>Rangour</option>
                <option>Chittagong</option>
                <option>Mymensingh</option>
                <option>Sylhet</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">
                Delivery Time
              </label>
              <input
                type="date"
                defaultValue={delivaryTime.toISOString().split("T")[0]}
                className="input w-full outline-none"
              />
            </div>
          </div>

          {/* ========== QUANTITY ========== */}

          {/* ========== NOTE ========== */}
          <div>
            <label className="block mb-1 font-medium text-sm">
              Note for Chef (Optional)
            </label>
            <textarea
            {...register("userNote")}
              rows="2"
              placeholder="Ex: Not too spicy..."
              className="textarea w-full outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg space-y-4 h-fit lg:sticky top-6">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <div className="flex justify-between text-sm">
            <span>Meal Price</span>
            <span>৳ {price}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Quantity</span>
            <span>x {quantity}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>৳ 40</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">৳ {totalPrice}</span>
          </div>

          <button
          onClick={handleSubmit(handleConfirmOrder)}
          className="btn my-btn w-full mt-4 py-3 text-sm sm:text-base">
            Place Order
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 mt-3 text-xs sm:text-sm text-gray-500 hover:text-primary"
          >
            <FaArrowLeft /> Go back
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
export default OrderMeal;
