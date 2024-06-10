import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../config/axiosConfig.js";
import { loginSuccess, loginFail } from "../../redux/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const { name, password } = formData;
  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      dispatch(loginSuccess(res.data.token));
    } catch (err) {
      dispatch(loginFail());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-900">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
