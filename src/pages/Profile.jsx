import React from "react";
import { FaEdit } from "react-icons/fa";
import useAuth from "../hooks/authentication/useAuth";
import useAxiosSecure from "../axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const { data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userinfo/${user?.email}`);
      return res.data;
    },
  });

  const fullName = userInfo?.name || "";
  const [firstName = "N/A", lastName = ""] = fullName.split(" ");
  console.log(userInfo);
  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
        <img
          src={userInfo?.profile_image || "/default-profile.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
          <p className="text-gray-500 capitalize">{userInfo?.role || "N/A"}</p>
          <p className="text-green-400 text-sm">● {userInfo?.status || "N/A"}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold">Personal Information</h3>
          <button className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600">
            <FaEdit /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <p className="text-gray-400 text-sm">First Name</p>
            <p>{firstName}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Last Name</p>
            <p>{lastName || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Date of Birth</p>
            <p>{userInfo?.dateOfBirth || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email Address</p>
            <p>{userInfo?.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Phone Number</p>
            <p>{userInfo?.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">User Role</p>
            <p className=" badge badge-primary">{userInfo?.role || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold">Address</h3>
          <button className="flex items-center gap-1 border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100">
            <FaEdit /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <p className="text-gray-400 text-sm">Country</p>
            <p>{userInfo?.country || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">City</p>
            <p>{userInfo?.city || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Postal Code</p>
            <p>{userInfo?.postalCode || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-end md:flex-row gap-4 mt-8">
        <button className="w-full md:w-auto bg-secondary text-white py-2 px-5 rounded-lg shadow hover:bg-green-700">
          Be a Chef
        </button>

        <button className="w-full md:w-auto bg-primary text-white py-2 px-5 rounded-lg shadow hover:bg-blue-700">
          Be an Admin
        </button>
      </div>

    </div>
  );
};

export default Profile;
