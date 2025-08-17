import { Link, useLocation, useNavigate } from "react-router";
import loginImg from "../../assets/login-image.jpg";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const {signIn,signInWithGoogle,resetPassword} = useAuth();
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

  const handleForgotPassword = () => {
  const email = document.querySelector("input[name='email']").value;
  if (!email) {
    Swal.fire({
      icon: "warning",
      title: "Enter Email First",
      text: "Please enter your email address to reset your password.",
    });
    return;
  }

  resetPassword(email)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Reset Link Sent",
        text: `Password reset email sent to ${email}. Check your inbox.`,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: error.message,
      });
    });
};


  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-base-100 px-4 md:px-16 lg:px-36">
      {/* Left Image */}
      <div className="lg:w-1/3 w-full h-64 lg:h-auto">
        <img
          src={loginImg}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="lg:w-2/3 w-full flex items-center justify-center  px-6 py-12">
        <div className="w-full max-w-xl bg-base-300  p-8 ">
          <h2 className="text-3xl font-bold text-center  mb-6">
            Welcome Back To Your TourismFlow
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  bg-opacity-70 placeholder:text-gray-400 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400  bg-opacity-70  text-sm"
              />
            </div>

            {/* Forgot Password */}
        <div className="text-right">
  <button
    type="button"
    onClick={handleForgotPassword}
    className="text-sm hover:underline"
  >
    Forgot password?
  </button>
</div>
        {error && <p className="text-red-400 text-xs">{error}</p>}

            {/* Bottom Links & Login */}
            <div className="flex justify-between items-center text-sm">
              <p className="">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-400 hover:underline">
                  Sign up
                </Link>
              </p>

              <button
                type="submit"
                className=" bg-base-100 hover:bg-slate-700 px-5 py-2 rounded-md font-semibold text-sm"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px border"></div>
              <span className=" text-sm">OR</span>
              <div className="flex-1 h-px border"></div>
            </div>

            {/* Google Sign In */}
            <button onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-md text-sm  transition"
            >
              <FcGoogle size={22} />
              Sign in with Google
            </button>
          </form>

          <p className="text-center text-xs mt-6">
            © 2025 TourismFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
