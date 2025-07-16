
import registerImg from "../../assets/register-image.jpg";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const photo = form.photo.value.trim();
  const password = form.password.value;

  // Validation
  if (!name || !email || !photo || !password) {
    setError("All fields are required.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    setError("Password must contain at least one uppercase letter.");
    return;
  }

  if (!/[!@#$%^&*]/.test(password)) {
    setError("Password must include at least one special character.");
    return;
  }

  setError(""); // Clear previous errors

  // Create user
  createUser(email, password)
    .then((result) => {
      const user = result.user;

      // Update user profile
      updateUserProfile(name, photo)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: `Welcome, ${name}!`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location.state || "/");
        })
        .catch((err) => {
          setError(err.message);
          Swal.fire({
            icon: "error",
            title: "Profile Update Failed",
            text: err.message,
          });
        });
    })
    .catch((error) => {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    });
};

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Signed in with Google",
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Google Sign In Failed",
          text: err.message,
        });
      });
  };



  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Image */}
      <div className="lg:w-1/3 w-full h-64 lg:h-auto">
        <img src={registerImg} alt="Register Visual" className="w-full h-full object-cover" />
      </div>

      {/* Right Form */}
      <div className="lg:w-2/3 w-full flex items-center justify-center bg-gradient-to-br from-[#f9f9f9] to-[#eef2f3] px-6 py-12">
        <div className="w-full max-w-xl bg-white p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Create Your TourismFlow Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-70 placeholder:text-gray-400 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@mail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-70 placeholder:text-gray-400 text-sm"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Photo URL</label>
              <input
                name="photo"
                type="url"
                placeholder="https://your-image-link.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-70 placeholder:text-gray-400 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-70 placeholder:text-gray-400 text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Bottom Links & Register */}
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>

              <button
                type="submit"
                className="bg-gray-600 hover:bg-slate-700 text-white px-5 py-2 rounded-md font-semibold text-sm"
              >
                Register
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-100 transition"
            >
              <FcGoogle size={22} />
              Sign in with Google
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2025 TourismFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
