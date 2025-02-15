import React from "react";
import logo from "../../assets/navbar-logo.png";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const Navbar = ({ setMenu, setSearch }) => {
  const NavButton = ({ title, onClick }) => {
    return (
      <button
        onClick={onClick}
        className=" text-white font-medium text-[17px] border-b-2 border-b-transparent hover:border-b-2 hover:border-b-white transition-all duration-100 cursor-pointer"
      >
        {title}
      </button>
    );
  };

  // LOGOUT FUNCTION

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-3 bg-slate-900 p-2 w-full fixed z-10">
      {/* LOGO AND SIGN IN HERE */}

      {auth.currentUser ? (
        <div onClick={logout} className="flex gap-2 w-full">
          <img className="w-56" src={logo} alt="" />
          <div
            className="flex items-center gap-2 text-white text-xl font-medium border-b-[3px] 
          border-b-transparent w-full hover:border-b-[3px] hover:border-b-white cursor-pointer 
          transition-all duration-100"
          >
            <FaUser className="text-3xl" />
            <p>Sign out</p>
          </div>

          <div className="w-[3px] h-[80%] my-auto bg-gray-500/50"></div>
        </div>
      ) : (
        <Link to="/signin">
          <div className="flex gap-2 w-full">
            <img className="w-56" src={logo} alt="" />
            <div
              className="flex items-center gap-2 text-white text-xl font-medium border-b-[3px] 
        border-b-transparent w-full hover:border-b-[3px] hover:border-b-white cursor-pointer 
        transition-all duration-100"
            >
              <FaUser className="text-3xl" />
              <p>Sign in</p>
            </div>

            <div className="w-[3px] h-[80%] my-auto bg-gray-500/50"></div>
          </div>
        </Link>
      )}

      {/* MENU OPTIONS HERE */}

      <div className="flex items-center ml-8 gap-10">
        <NavButton
          title="Home"
          onClick={() => setMenu("top-headlines?country=us")}
        />
        <NavButton
          title="Science"
          onClick={() => setMenu("everything?q=Science")}
        />
        <NavButton
          title="Sport"
          onClick={() => setMenu("everything?q=Sport")}
        />
        <NavButton
          title="Movies"
          onClick={() => setMenu("everything?q=Movies")}
        />
        <NavButton
          title="Travel"
          onClick={() => setMenu("everything?q=Travel")}
        />
        <NavButton
          title="Future"
          onClick={() => setMenu("everything?q=Future")}
        />
        <NavButton title="Tech" onClick={() => setMenu("everything?q=Tech")} />
      </div>

      {/* SEARCH BOX HERE */}

      <div
        className="bg-slate-200 ml-35 flex items-center text-slate-900 gap-5 pl-5 
      rounded-full cursor-pointer hover:bg-slate-300 transition-all h-[90%] my-auto"
      >
        <FaSearch className="text-[28px]" />
        <input
          type="text"
          className="text-xl font-medium outline-none w-full"
          placeholder="Search Newsly"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
