import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, datebase } from "../../firebase/firebaseConfig";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Comments = ({ data }) => {
  const [comment, setComment] = useState("");
  const [newsCommentsData, setNewsCommentsData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addComments = async () => {
    const newsDoc = doc(datebase, "News", `${data.url.substr(-10, 10)}`);
    const commentRef = collection(newsDoc, "Comments");
    auth.currentUser == null &&
      toast.info("Please Login to Continue", { theme: "dark" });
    try {
      auth.currentUser &&
        (await addDoc(commentRef, {
          comment: comment,
          author: auth.currentUser.displayName,
          profileImg: auth.currentUser.photoURL,
        }));
      auth.currentUser &&
        toast.success("Comment Added Successfully", { theme: "dark" });
    } catch (error) {
      auth.currentUser && toast.success(`${error.message}`, { theme: "dark" });
      console.log(error);
    }
  };

  const showComments = async () => {
    const newsDoc = doc(datebase, "News", `${data.url.substr(-10, 10)}`);
    const commentRef = collection(newsDoc, "Comments");
    try {
      const data = await getDocs(commentRef);

      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsCommentsData(filteredData);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showComments();
  }, [comment, newsCommentsData]);

  return (
    <div className="flex flex-col gap-5">
      {/* ADD COMMENT FIELD HERE */}

      <div className="mt-5 w-2/3 mx-auto">
        <div className="flex flex-col items-center">
          <label
            htmlFor="comment"
            class="block mb-2 text-2xl font-bold text-slate-900 "
          >
            Comments
          </label>
          <div className="w-full flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              id="comment"
              class="bg-gray-100 border border-gray-300 text-slate-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              placeholder="Add a comment"
              required
              onChange={(e) => {
                setInputValue(e.target.value);
                setComment(inputValue);
              }}
            />
            <button
              onClick={() => {
                addComments();
                setInputValue("");
              }}
              className="bg-slate-900 text-white text-xl px-5 py-2 rounded-lg cursor-pointer 
            hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ALL COMMENTS SHOWN HERE */}

      <div className="mx-5 flex flex-col gap-3">
        {newsCommentsData.map((data) => (
          <div
            key={data.id}
            className="flex flex-col gap-1 bg-gray-200 shadow-lg rounded-lg p-2"
          >
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7 rounded-full"
                src={data.profileImg ? data.profileImg : <FaUser />}
                alt=""
              />
              <h3 className="text-[14px]  text-gray-800">{data.author}</h3>
            </div>

            <p className="text-[16px] pl-1 font-medium">{data.comment}</p>
          </div>
        ))}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Comments;
