import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/api";
import Toast from "./Toast";
import logogypsum from "../assets/logoipsum.svg";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await getUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setToast({
        show: true,
        message: "Failed to load users. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        setToast({
          show: true,
          message: "User deleted successfully",
          type: "success",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        setToast({
          show: true,
          message: "Failed to delete user. Please try again.",
          type: "error",
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          <img src={logogypsum} alt="" />
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-4 bg-gray-100">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {user.email || "No email provided"}
                  </p>
                </div>
                <div className="flex border-t border-gray-200">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="w-1/2 py-3 text-center text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="w-1/2 py-3 text-center text-red-600 font-medium hover:bg-red-50 transition-colors border-l border-gray-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search.
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded border ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-indigo-600 text-white rounded">
                {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded border ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
