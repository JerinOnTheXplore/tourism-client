import { Link, useLocation, useNavigate } from "react-router";
import loginImg from "../../assets/login-image.jpg";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const {signIn,signInWithGoogle,} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn =()=>{
       setLoading(true);
        signInWithGoogle()
        .then((result)=>{
            console.log(result.user);
            navigate(`${location.state? location.state : "/"}`);
        Swal.fire({
                icon: 'success',
                title: 'Signed in successfully!',
                text: `Welcome, ${result.user.displayName || 'User'}!`,
                showConfirmButton: false,
                timer: 1500
                
            });
            
        })
        .catch((error)=>{
            const errorMessage=error.message;
            setError(errorMessage);
         Swal.fire({
            icon: 'error',
            title: 'Sign In Failed',
            text: errorMessage,
            confirmButtonColor: '#d33'
            });

        })
    }

   const handleLogin = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });

    signIn(email,password)
    .then((result)=>{
      const user = result.user;
    //   console.log(user);

     Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          text: `Welcome, ${user.displayName || 'User'}!`,
          timer: 1500
        });
    navigate(`${location.state ? location.state : "/"}`);
    })
    .catch((error)=>{
      const errorCode = error.code;
      setError(errorCode);
      Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message || 'Please check your credentials',
        });
    })
  }



  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Image */}
      <div className="lg:w-1/3 w-full h-64 lg:h-auto">
        <img
          src={loginImg}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="lg:w-2/3 w-full flex items-center justify-center bg-gradient-to-br from-[#f9f9f9] to-[#eef2f3] px-6 py-12">
        <div className="w-full max-w-xl bg-white  p-8 ">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Welcome Back To Your TourismFlow
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
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

            {/* Forgot Password */}
        <div className="text-right">
        <span className="text-sm text-gray-700 hover:underline cursor-pointer">
        Forgot password?
        </span>
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}

            {/* Bottom Links & Login */}
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>

              <button
                type="submit"
                className=" bg-gray-600 hover:bg-slate-700 text-white px-5 py-2 rounded-md font-semibold text-sm"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button onClick={handleGoogleSignIn}
              type="button"
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

export default Login;
