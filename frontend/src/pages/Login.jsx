import { useState } from "react";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      // Saving the token in localstorage
      localStorage.setItem("token", response.data.token);

      setMessage(response.data.msg);
      toast.success(response.data.msg);

      // Redirecting  to a protected route after login successfull
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
      toast.error(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  };

  console.log(message);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center bg-gray-700">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded-lg p-8 w-96 text-black"
      >
        <h2 className="text-2xl font-semibold  text-center mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
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
          Don't have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
