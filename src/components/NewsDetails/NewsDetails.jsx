import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/newsly-logo.png";
import navbarLogo from "../../assets/navbar-logo.png";
import Comments from "../Comments/Comments";

const NewsDetails = () => {
  const location = useLocation();
  const data = location.state.data;
  console.log(data);

  const para = data.content.split(/\[\+\d+\s?chars\]/);

  return (
    <div className="h-screen">
      {/* TOP NAVBAR HERE */}

      <div className="bg-slate-900 flex justify-center py-2 fixed w-full">
        <img className="w-44" src={navbarLogo} alt="" />
      </div>

      <div className="grid grid-cols-2 pt-14 h-screen ">
        {/* NEWS DETAILS SECTION HERE */}

        <div className="p-5 flex flex-col items-center rounded-lg m-2 bg-gray-200/70 shadow-2xl ">
          <h1 className="text-4xl font-bold text-justify">{data.title}</h1>
          <p className="text-justify mt-2 text-lg font-medium text-gray-700">
            {data.description}
          </p>
          <p className="text-justify mt-2 text-lg font-medium text-gray-700">
            {para}{" "}
            {data.url ? (
              <span className="text-blue-700 hover:text-blue-800 font-bold tracking-wide underline cursor-pointer">
                <a href={data.url} target="_blank">
                  Read more
                </a>
              </span>
            ) : (
              ""
            )}
          </p>
          <img
            className="rounded-lg w-full mt-5"
            src={data.urlToImage ? data.urlToImage : logo}
            alt={data.title}
          />
        </div>

        {/* COMMENT SECTION HERE */}

        <div>
          <Comments data={data} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
