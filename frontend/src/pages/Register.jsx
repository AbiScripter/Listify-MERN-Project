import { useState } from "react";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // getting api from services/api which has all the apis and sending request
      const response = await registerUser(formData);
      setMessage(response.data.msg);
      toast.success(response.data.msg);
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
      toast.error(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  console.log(formData);

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center bg-gray-700">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-semibold  text-center mb-6">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block  text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block  text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block  text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={6}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
