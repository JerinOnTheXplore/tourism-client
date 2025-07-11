// src/components/StoriesSection.jsx
import React, { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { MdOutlineTravelExplore } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const StoriesSection = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("https://tourism-server-delta.vercel.app/api/stories")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Failed to fetch stories", err));
  }, []);

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <div className="px-6 md:px-20 py-16 bg-gradient-to-br from-[#e0f4ff] via-white to-[#e0f4ff]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <MdOutlineTravelExplore className="text-blue-600 text-4xl" /> Tourist Stories
        </h2>
        <Link
          to="/stories"
          className="bg-gradient-to-br from-[#63aedc] via-[#4194cc] to-[#2a75b3] hover:to-slate-600 text-white px-6 py-2 rounded-full shadow-lg"
        >
          All Stories
        </Link>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {stories.map((story, idx) => (
    <div
      key={idx}
      className="relative bg-white p-6 rounded-r-3xl shadow-2xl hover:shadow-blue-200 transition duration-300 flex flex-col justify-between border-t-12 border-[#cbe7f4] border-l-12"
    >
      <div className="absolute top-[-20px] left-5 bg-[#63aedc] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
        Travel Story
      </div>

      <img
        src={story.touristImage}
        alt={story.touristName}
        className="w-full h-48 object-cover rounded-xl mb-4 border-2 border-blue-200"
      />

      <h3 className="text-xl font-extrabold text-[#63aedc] mb-1 tracking-tight">
        {story.touristName}
      </h3>
      <p className="text-sm text-[#63aedc] mb-2 font-semibold uppercase">
        {story.packageName}
      </p>

      <p className="text-gray-600 text-[15px] italic mb-4 font-medium leading-relaxed">
        "{story.story}"
      </p>

      {user ? (
        <FacebookShareButton
          url={window.location.href}
          quote={`${story.touristName}'s experience in ${story.packageName}: ${story.story}`}
          hashtag="#TravelWithUs"
          className="flex items-center gap-2 justify-center mt-auto"
        >
          <FacebookIcon size={32} round />
          <span className="text-sm font-bold text-[#63aedc]">Share</span>
        </FacebookShareButton>
      ) : (
        <button
          onClick={handleShare}
          className="text-sm text-blue-600 underline mt-auto text-center"
        >
          Login to Share
        </button>
      )}
    </div>
  ))}
</div>

    </div>
  );
};

export default StoriesSection;
