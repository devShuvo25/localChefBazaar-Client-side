import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../axios/useAxiosSecure";
import useAuth from "../../hooks/authentication/useAuth";

const Manage_Request = () => {
    const {axiosSecure} = useAxiosSecure()
    const {user} = useAuth()
  // Example request data
  const {data : requests =[],refetch} = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
        const res = axiosSecure.get('/user-request')
        return (await res).data
    }
  })
//   manage request
const handleManageRequest = (id,action,type) => {
    if(id && action) {
        try{
            axiosSecure.patch(`/user-request?id=${id}&action=${action}&type=${type}&email=${user?.email}`)
            .then(res => {
                if(res.data){
                    refetch()
                }
            })
        }
        catch{
            console.log("Someting went wrong to manage request");
        }
    }
    
}
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Manage User Requests</h2>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="table">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 ">
                {/* User + Avatar */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={req.user_image} alt="user avatar" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">{req.user_name}</p>
                      <p className="text-xs opacity-50">{req.user_email}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td>{req.user_email}</td>

                {/* Request Type */}
                <td>
                  <span
                    className={`badge ${
                      req.requestType === "chef"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {req.request_type}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.request_status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.request_status}
                  </span>
                </td>

                {/* Request Time */}
                <td className="text-sm text-gray-600">{req.request_time}</td>

                {/* Action Buttons */}
                <td className="space-x-4 flex items-center justify-between">
                  <button disabled={req.request_status !== 'Pending'}
                   onClick={() => handleManageRequest(req?._id,'Accepted',req.request_type) } className="btn btn-success btn-xs text-white">
                    Accept
                  </button>
                  <button disabled={req.request_status !== 'Pending'} 
                  onClick={() => handleManageRequest(req?._id,'Rejected',req.request_type)} className="btn btn-error btn-xs text-white">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Manage_Request;
