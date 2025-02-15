import React from "react";
import logo from "../assets/newsly-logo.png";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { datebase } from "../firebase/firebaseConfig";

const NewsCard = ({ data }) => {
  const addNews = async (data) => {
    const newsDoc = doc(datebase, "News", `${data.url.substr(-10, 10)}`);
    try {
      await setDoc(newsDoc, {
        title: data.title,
        description: data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      class="max-w-sm rounded overflow-hidden shadow-lg border-2 border-slate-700 cursor-pointer 
    hover:scale-[102%] hover:transition-all hover:duration-300 transition-all duration-300"
    >
      <Link onClick={() => addNews(data)} to="/details" state={{ data: data }}>
        <div>
          <img
            class="w-full"
            src={data.urlToImage ? data.urlToImage : logo}
            alt={data.title}
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{data.title}</div>
            <p class="text-gray-700 text-base">{data.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
