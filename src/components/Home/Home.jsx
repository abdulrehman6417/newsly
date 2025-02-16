import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard";

const Home = ({ menu, search }) => {
  //https://newsapi.org/v2/everything?q=Tech&apiKey=144574a573d349e990e9020794764529
  //a8c41cc0675a41d0bc8702d92c4e6be7
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = String(import.meta.env.VITE_NEWS_API_KEY);

  const getNews = () => {
    setLoading(true);
    fetch(
      `https://newsapi.org/v2/${
        menu ? menu : "top-headlines?country=us"
      }&apiKey=a8c41cc0675a41d0bc8702d92c4e6be7`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setNews(jsonData.articles);
        setLoading(false);
      });
  };

  useEffect(() => {
    getNews();
  }, [menu]);
  return (
    <div className="mt-20 p-4">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-15 w-15 border-b-4 border-slate-800"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {news
            ?.filter((data) => data.title.toLowerCase().includes(search))
            .map((data, index) => (
              <NewsCard key={index} data={data} />
            ))}
        </div>
      )}
    </div>
    // <div className="mt-20 p-4 grid grid-cols-4 gap-5">
    //   {news.map((data) => (
    //     <NewsCard data={data} />
    //   ))}
    // </div>
  );
};

export default Home;
