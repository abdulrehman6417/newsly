import React, { useRef, useState } from "react";
import CoverImage from "../../assets/cover3.png";
import CoverLogo from "../../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  // HIDE AND SHOW PASSWORD FUNCTIONALITY

  const passRef = useRef();
  const [showPass, setShowPass] = useState(false);
  const [passType, setPassType] = useState("password");
  const toggleShowPass = () => {
    if (showPass) {
      setShowPass((prev) => !prev);

      setPassType("password");
      passRef.current.type = passType;
    } else {
      setShowPass((prev) => !prev);

      setPassType("text");
      passRef.current.type = passType;
    }
  };

  // SIGN IN WITH GOOGLE USING FIREBASE FUNCTION HERE

  const navigate = useNavigate();

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      auth.currentUser && navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen bg-black">
      <div className="flex flex-col items-center mt-10">
        {/* APP LOGO HERE */}

        <img src={CoverLogo} className="w-40" alt="" />

        {/* SIGN IN TEXT HERE */}

        <h1 className="text-white text-3xl font-bold tracking-wide mt-5">
          Sign in to your account
        </h1>

        {/* EMAIL FIELD HERE */}

        <div className="mt-20 w-96 border-b-slate-400 border-b-2">
          <input
            type="email"
            placeholder="Email"
            className="outline-none text-slate-100 text-2xl mb-0.5 w-full"
          />
        </div>

        {/* PASSWORD FIELD HERE */}

        <div className="mt-10 w-96 border-b-slate-400 border-b-2 flex gap-2">
          <input
            type={passType}
            placeholder="Password"
            className="outline-none text-slate-100 text-2xl mb-0.5 w-full"
            ref={passRef}
          />
          {showPass ? (
            <FaEyeSlash
              className="text-slate-300 text-2xl cursor-pointer"
              onClick={toggleShowPass}
            />
          ) : (
            <FaEye
              className="text-slate-300 text-2xl cursor-pointer"
              onClick={toggleShowPass}
            />
          )}
        </div>

        {/* SIGN IN BUTTON HERE */}

        <div
          className="mt-3 bg-blue-600 text-white text-xl font-medium w-96 text-center py-3 rounded-sm 
        cursor-pointer hover:scale-[102%] hover:bg-blue-700 hover:transition-all duration-200"
        >
          Sign in
        </div>

        {/* GOOGLE SIGN IN BUTTON HERE */}

        <div
          onClick={googleSignin}
          className="flex items-center gap-2 mt-5 cursor-pointer px-4 py-2 rounded-3xl hover:bg-green-950 
        transition-all duration-100"
        >
          <h1 className="text-white text-[20px] font-medium">Sign in with</h1>
          <FcGoogle className="text-3xl" />
        </div>

        {/* DIVIDER HERE */}

        <div className="bg-gray-400 w-96 h-0.5 mt-5 rounded-2xl"></div>

        {/* REGISTER TEXT HERE */}

        <div className="text-center">
          <h1 className="text-white text-xl font-medium tracking-wide mt-8">
            Don't have a Newsly account?
          </h1>

          <p className="text-blue-500 text-lg font-bold underline mt-2 hover:cursor-pointer tracking-wide">
            Register Now
          </p>
        </div>
      </div>

      {/* BACKGROUND IMAGE HERE */}

      <div className="flex items-center">
        <img src={CoverImage} className="" alt="" />
      </div>
    </div>
  );
};

// TO CHECK ON GIT

export default Signin;
