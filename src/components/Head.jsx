import React, { useContext } from "react";
import logo from "../assets/Logo3.png";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { UserContext } from "../context/userContext";

const Head = () => {
  const { currUser } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center p-4 shadow-lg fixed top-0 bg-white w-full z-10">
      <div className="flex items-center gap-4">
        <Link to={"/"}>
          <img
            src={logo}
            alt="pdf"
            className="rounded-lg size-7 lg:size-9 transition duration-300 transform hover:scale-110"
          />
        </Link>
        <Link to={"/"}>
          <AiFillHome className="size-6 md:size-7 hover:scale-125" />
        </Link>
      </div>
      <div className="font-semibold flex gap-4 items-center ">
        {currUser && (
          <Link
            className="duration-200  hover:scale-110 hover:font-bold"
            to={"/myfiles"}
          >
            MyFiles
          </Link>
        )}
        {!currUser ? (
          <Link
            className="text-xs sm:text-sm md:text-md lg:text-lg bg-[#2b2d42] text-white px-2 py-1 rounded-lg  duration-200  hover:scale-110"
            to={"/login"}
          >
            Login
          </Link>
        ) : (
          <Link
            className="text-xs sm:text-sm md:text-md lg:text-lg   bg-[#2b2d42] text-white px-2 py-1 rounded-lg  duration-200  hover:scale-110"
            to={"/logout"}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Head;
