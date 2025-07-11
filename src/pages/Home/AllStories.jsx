import React, { useEffect, useState } from "react";
import axios from "axios";

const AllStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("https://tourism-server-delta.vercel.app/api/stories/all")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Failed to fetch all stories", err));
  }, []);

  return (
    <div className="px-6 md:px-20 py-16 min-h-screen bg-gradient-to-br from-[#d3edfa] via-white to-[#d3edfa]">
      <h2 className="text-4xl font-bold text-center text-slate-800 mb-10">All Tourist Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg border-l-[10px] border-[#63aedc] hover:shadow-blue-200 transition duration-300"
          >
            <img
              src={story.touristImage}
              alt={story.touristName}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-[#63aedc] mb-1">{story.touristName}</h3>
            <p className="text-sm text-[#63aedc] mb-2 font-semibold uppercase">
              {story.packageName}
            </p>
            <p className="text-gray-700 text-base leading-relaxed italic">
              "{story.story}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
