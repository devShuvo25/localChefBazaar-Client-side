import React, { useEffect } from "react";
import useAuth from "../hooks/authentication/useAuth";
import useAxiosSecure from "../axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { data } from "react-router";

const Home = () => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();


  return (
    <div>
      {/* <h1 className='text-primary'>{result?.data.length}</h1> */}
      <button className="btn btn-primary">Button</button>
      <h1 className="text-accent">This is accent color</h1>
      <h1 className="text-secondary">{user?.displayName}</h1>
      <img className="h-50 w-50" src={user?.photoURL} alt="" />
    </div>
  );
};

export default Home;
