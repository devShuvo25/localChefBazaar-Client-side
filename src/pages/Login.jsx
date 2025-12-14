import { IoEyeOffOutline, IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import illustrator from "../assets/undraw_access-account_aydp.svg";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/authentication/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Login = () => {
  const containerRef = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".left-section", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(".right-section", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");
  }, { scope: containerRef });

  const { axiosSecure } = useAxiosSecure();
  // const addUserToDB = useMutation({
  //   mutationFn: async (userInfo) => {
  //     const res = await axiosSecure.post("/users", userInfo);
  //     console.log(res.data);
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     console.log("hello");
  //     if (location.state) {
  //       return navigate(location.state);
  //     }
  //     navigate("/login");
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //     Swal.fire({
  //       title: "Error",
  //       text: err.message,
  //       icon: "error",
  //     });
  //   },
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const user_password = watch("user_password");
  const user_email = watch("user_email");
  const { googleSignIn, logIn } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  const [error, setError] = useState();
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  console.log(location.state);
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then( (result) => {
        if (result.user) {
          navigate(location.state || '/')
        const userData = {
          name: result?.user?.displayName || "Anonymous",
          profile_image: result?.user?.photoURL || null,
          email: result?.user?.email,
          status: "Active",
          role: "User",
          created_at: new Date(),
        };
        axiosSecure.post('/users',userData)
          .then(res => {
            console.log(res.data);
          })
          // Swal.fire(
          //   title: "Suucessfully loged in",
          //   icon: "success",
          // });
        }
      })
      .catch((err) => console.log(err.message));
  };
  const handleSignInUser = (data) => {
    console.log(data);
    logIn(data.user_email, data.user_password)
      .then((result) => {
        console.log(result);
        if (result.user) {
          navigate("/");
        }
      })
      .catch((err) => {
        err.message = "Invalid email or password";
        setError(err.message);
      });
  };

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row w-full items-center justify-center  lg:p-10">
      <title>Log in</title>

      {/* Left side */}
      <div className="left-section w-full lg:w-[50%] ps-0  flex flex-col lg:flex-row mb-10 lg:mb-0 gap-2">
        <img className="h-50 max-w-xs " src={illustrator} alt="" />
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-6xl -ms-1 font-bold text-primary">
            Welcome Back
          </h1>
          <h4 className="text-xl">Login to Your Account</h4>
          <p className="text-sm">
            Access your dashboard, manage your activity, and continue where you
            left off.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="right-section w-full lg:w-[50%]  flex justify-center">
        <div className="card bg-white shadow-sm flex flex-row w-full max-w-md shrink-0 p-3">
          <div className="card-body w-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary">Login</h1>
            </div>
            <form onSubmit={handleSubmit(handleSignInUser)}>
              <fieldset className="fieldset w-full ">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full p-[11px] outline-[1px] focus:outline-primary outline-gray-300 border-1px rounded-full"
                  placeholder="Email"
                  {...register("user_email", { required: true })}
                />
                {user_email && !/^\S+@\S+\.\S+$/.test(user_email) && (
                  <p className="text-primary">Invalid email format</p>
                )}
                <label className="label">Password</label>
                <div className="relative overflow-visible">
                  <input
                    type={isActive ? "text" : "password"}
                    name="password"
                    className="w-full p-[11px] outline-[1px] focus:outline-primary outline-gray-300 border-1px rounded-full"
                    placeholder="Password"
                    {...register("user_password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message:
                          "Password must be at least 6 characters long and include both an uppercase and a lowercase letter.",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message:
                          "Password must be at least 6 characters long and include both an uppercase and a lowercase letter and number.",
                      },
                    })}
                  />
                  <div
                    onClick={() => setIsActive(!isActive)}
                    className="absolute overflow-visible top-[13px] right-5 cursor-pointer text-primary"
                  >
                    {isActive ? (
                      <IoEyeSharp size={15} />
                    ) : (
                      <HiMiniEyeSlash size={15} />
                    )}
                  </div>
                </div>

                <div>
                  <a className="my-links cursor-pointer">Forgot password?</a>
                </div>
                {errors.user_password && (
                  <p className="text-primary">
                    {errors?.user_password.message}
                  </p>
                )}
                {error && <p className="text-primary">{error}</p>}
                <button className="btn btn-primary text-white mt-4 rounded-full w-full">
                  Login
                </button>

                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="btn bg-white rounded-full text-black border-[#e5e5e5] w-full mt-2 flex items-center justify-center gap-2"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>

                <p className="text-center mt-3 text-sm">
                  Don't have an account?{" "}
                  <Link to={"/register"} className="my-links !text-primary">
                    Register Now
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
