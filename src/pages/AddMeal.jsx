import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../axios/useAxiosSecure';
import useAuth from '../hooks/authentication/useAuth';
import Swal from 'sweetalert2';

const AddMeal =  () => {
  const {register,handleSubmit} = useForm()
  const {user} = useAuth()
  const {axiosSecure} = useAxiosSecure()
  const bdDivisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];
  // create a new meal
const handleUploadFoodImage = async (data) => {
  const file = data.food_image[0];
  if (!file) return alert("Please select an image");

  // Convert to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // remove data:image/...;base64,
      reader.onerror = (error) => reject(error);
    });

  const base64Image = await toBase64(file);

  const formData = new FormData();
  formData.append('image', base64Image); // 🔥 must be 'image'

  const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;

  try {
    const res = await fetch(imageAPI, {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    // console.log("Uploaded Image:", result.data);
    return result.data.url; // this is the URL
  } catch (err) {
    console.error(err);
  }
  
};
const handleCreateMeal = async (data) => {
const ingredientsData = data.ingredients.trim().split(','); // array of strings
const ingredients = ingredientsData.map(item => {
  const trimmed = item.trim(); // remove spaces around each ingredient
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
});
  const photoURL = await handleUploadFoodImage(data)
  if(data && user) {
    const mealData = {
      foodName: data.food_name,
      foodImage: photoURL,
      chefName: data.chef_name,
      chefEmail: user.email,
      price:data.price,
      rating:data.rating,
      ingredients: ingredients,
      deliveryArea: data.delivary_area,
      estimatedDeliveryTime:data.delivary_time + 'minutes',
      chefExperience:data.experience,
      chefId:data.chef_id,
      action:'Order Now'

    }
    console.log(mealData);
    Swal.fire({
  title: "Do you want to add a new meal?",
   html: 'Uploading image and saving data, please wait...',
  showDenyButton: true,
  showCancelButton: true,
  showLoaderOnConfirm:true,
  confirmButtonText: "Yes ,Add",
}).then(result => {
  if(result.isConfirmed){
     try{
      axiosSecure.post('/meal', mealData)
      .then(res => {
        if(res.data.insertedId){
           Swal.fire("Added", "", "success");
        }
      })
    }
    catch{
      console.log("Something went erong to post meal");
    }
  }
})
   
  
  }

}

    return (
        <div className="bg-habit-bg min-h-screen text-habit-text mb-5  px-4">



      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-2xl lg:text-5xl font-bold text-habit-primary my-4 lg:my-8">
          Add a New <span className="color-primary">Meal</span>
        </h1>
        <p className="text-habit-text/70 text-lg opacity-70">
          Provide meal details to create a new menu item.
        </p>
      </motion.div>

      {/* Form Section */}
      
        
      <motion.form
      onSubmit={handleSubmit(handleCreateMeal)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-full mx-auto bg-white p-4 lg:p-8 rounded-xl shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Habit Name */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Food Name
            </label>
            <div className="relative">
              <input
              {...register('food_name',{required:true})}
                type="text"
                placeholder="Enter Habit title"
                className="input w-full outline-0"
              />
            </div>
          </div>


          {/* Reminder Time */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Food image
            </label>
            <div className="relative">
              <input
                {...register('food_image',{required:true})}
                type="file"
                className=" file-input w-full outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Chef Name
            </label>
            <div className="relative">
              <input
              {...register('chef_name',{required:true})}
                type="text"
                placeholder='Input your name'
                className="input w-full outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Price
            </label>
            <div className="relative">
              <input
             {...register('price',{required:true})}
                type="text"
                placeholder='Input food price.Ex: 400'
                className="input w-full outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Rating
            </label>
            <div className="relative">
              {/* <input
              required
                type="text"
                name="time"
                className="input w-full outline-none"
              /> */}
              <select
              {...register('rating',{required:true})}
                defaultValue="Select Rating"
                className="select outline-none w-full"
              >
                <option disabled={true}>Select rating</option>
                {
                    [1,2,3,4,5].map(rating=> {
                        return <option >{rating}</option>
                    })
                }
              </select>
            </div>
          </div>
          <div>
            <label className="block text-habit-text font-medium mb-1">
             Delivary Time (mins)
            </label>
            <div className="relative">
              <input
              required
              {...register('delivary_time',{required:true})}
                type="text"
                
                className="input w-full outline-none"
              />
            </div>
          </div>
                    <div>
            <label className="block text-habit-text font-medium mb-1">
              Delivary Area
            </label>
            <div className="relative">
              <select 
              {...register('delivary_area',{required:true})}
              className='select outline-none w-full'>
               <option disabled={true}>Select rating</option>
                {
                    bdDivisions.map(area=> {
                        return <option >{area}</option>
                    })
                }
              </select>
            </div>
          </div>
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Chef ID
            </label>
            <div className="relative">
              <input
              {...register('chef_id',{required:true})}
                type="text"
                className="input w-full outline-none"
              />
            </div>
          </div>

          {/* Habit Name */}
          <div>
            <label className="block text-habit-text font-medium mb-1">
              Experience
            </label>
            <div className="relative">
              <input
                type="text"
                {...register('experience',{required:true})}
               
                placeholder="your Experience (if have)"
                className="input w-full outline-0"
              />
            </div>
          </div>
          {/* Habit Name */}



        </div>
        {/* Short Description */}
        <div>
          <label className="block text-habit-text font-medium mb-1">
            Ingredients 
          </label>
          <textarea
          {...register('ingredients',{required:true})}
            placeholder="Write all ingredients.Ex:Chicken breast,Lettuce,Tomatoes,..."
            className="input w-full h-20 resize-none outline-none focus:outline-0 "
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center gap-8">
          <Link to={'/'}
            type="button"
            className="btn"
          >
           <span><FaArrowLeft /></span> Go back
          </Link>
          <button
          type="submit"
           className="btn my-btn"
          >
            Add Meal
          </button>
        </div>
      </motion.form>
      
    </div>
    );
};

export default AddMeal;