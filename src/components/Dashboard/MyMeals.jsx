import React from 'react';
import useAuth from '../../hooks/authentication/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../axios/useAxiosSecure';
import Loader from '../Loader/Loader';
import MealsCard from '../cards/MealsCard';
import illustrator from '../../assets/undraw_happy-music_na4p.svg'
import { useLocation } from 'react-router';

const MyMeals = () => {
    const {user} = useAuth()
    const location = useLocation()
    const {axiosSecure} = useAxiosSecure()
    const {data: meals=[] ,isLoading,refetch} = useQuery({
        queryKey: ['myMeals'],
        queryFn: async () => {
            if(user){
                try{
                    const res = await axiosSecure.get(`/meals/user/${user.email}`)
                    return res.data;
                }
                catch{
                    console.log("Something went wrong to get data");
                }
            }
        }
    })
    console.log(meals);
    // delet function
    const handleDelete = (id) => {
        console.log("Deleted id will be:",id);
        if(id){
            try{
                axiosSecure.delete(`/my-meals/${id}`)
                .then(res => {
                    if(res.data){
                        console.log(res.data);
                        refetch()
                    }
                })
            }
            catch{
                console.log("Something went wrong to delet meal");
            }
        }
    }

    {isLoading && <Loader/>}
    return (

        <div>
             <div className="mb-6">
        <h1 className="text-3xl text-primary font-bold">My Meals</h1>
        <p className="text-gray-500">Here are the meals i created before</p>
      </div>
        <div>

        </div>
                  {
        isLoading? <Loader/> : 
        <div>
           {meals?.length === 0 && (
        <div className="text-center py-5">
          <h2 className="text-xl font-semibold text-primary">No Meals Yet</h2>
          <p className="text-gray-500 mt-2">Start adding some meals</p>
          <div className='flex items-center justify-center mt-5'>
            <img className='h-50 lg:h-60' src={illustrator} alt="" />
          </div>
        </div>
      )}

      {/* Meal Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meals?.map((meal) => (
          <MealsCard key={meal._id} meal={meal} 
           handleDelete={handleDelete}></MealsCard>
        ))}
      </div>

        </div>
      }
        </div>
    );
};

export default MyMeals;