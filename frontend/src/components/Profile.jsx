import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axiosConfig.js";
import { userLoaded, authError, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const { token, isAuthenticated, loading, user } = useSelector(
    (state) => state.auth.auth
  );

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(userLoaded(res.data.user));
        } catch (err) {
          dispatch(authError());
        }
      }
    };
    loadUser();
  }, [dispatch, token]);

  const logout_2 = async () => {
    await axios.post("/auth/logout");
    dispatch(logout());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {!loading && isAuthenticated && user ? (
          <div>
            <h1 className="text-2xl font-bold mb-6">Welcome {user.name}</h1>
            <button
              onClick={logout_2}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-700">Please log in</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
