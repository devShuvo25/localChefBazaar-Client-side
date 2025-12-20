import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Manage_Users = () => {
  const { axiosSecure } = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["manageUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data || [];
    },
  });

  // 🔴 Mark User as Fraud
  const handleMakeFraud = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this user as Fraud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/update-user/${id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire("Updated!", "User marked as Fraud", "success");
          }
        });
      }
    });
  };

  // 🔍 Filter + Sort
  const filteredUsers = useMemo(() => {
    let list = [...users];
    const q = searchQuery.toLowerCase();

    // Filter by name or email
    if (q) {
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortOption === "name-asc") return a.name?.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name?.localeCompare(a.name);
      if (sortOption === "newest")
        return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });

    return list;
  }, [users, searchQuery, sortOption]);

  if (isLoading) return <Loader />;

  return (
    <div className="lg:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-sm text-gray-500">
            Manage user roles and fraud status
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            className="input input-bordered w-full sm:w-60"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="select w-full select-bordered"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profile_image || "/favicon.ico"}
                className="w-12 h-12 rounded-full"
                alt={user.name}
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span>Role:</span>
              <span className="capitalize">{user.role}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span
                className={
                  user.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {user.status}
              </span>
            </div>

            {user.role !== "Admin" && (
              <button
                disabled={user.status === "Fraud"}
                onClick={() => handleMakeFraud(user._id)}
                className="btn btn-sm btn-primary w-full text-white"
              >
                Make Fraud
              </button>
            )}

            <button
              className="btn btn-sm btn-outline w-full mt-2"
              onClick={() => setSelectedUser(user)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={user.profile_image || "/favicon.ico"}
                    className="w-10 h-10 rounded-full"
                    alt={user.name}
                  />
                  <span>{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-secondary capitalize">
                    {user.role}
                  </span>
                </td>
                <td
                  className={
                    user.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {user.status}
                </td>
                <td className="text-right flex justify-end gap-2">
                  {user.role !== "Admin" && (
                    <button
                      disabled={user.status === "Fraud"}
                      onClick={() => handleMakeFraud(user._id)}
                      className="btn btn-sm btn-primary text-white"
                    >
                      Make Fraud
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Status:</strong> {selectedUser.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedUser.created_at).toLocaleString()}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className="btn btn-sm btn-primary mt-4"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Manage_Users;
