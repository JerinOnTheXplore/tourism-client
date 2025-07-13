import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { MdPeopleAlt } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Loading from "../loading/Loading";

const fetchAllStories = async () => {
  const res = await axios.get("https://tourism-server-delta.vercel.app/api/stories/all");
  return res.data;
};

const Community = () => {
  const { user } = useAuth();

  const {
    data: stories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-stories"],
    queryFn: fetchAllStories,
  });

  const handleShare = () => {
    if (!user) {
      alert("Please login to share a story.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-32 text-xl font-bold text-blue-800">
        <Loading></Loading>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-32 text-xl font-bold text-red-600">
        Failed to load community stories.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-20 py-16 bg-gradient-to-br from-[#e0f4ff] via-[#f7fbff] to-[#e0f4ff]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
          <MdPeopleAlt className="text-[#2a75b3] text-5xl" />
          <span className="text-[#2a75b3]">Our Traveler's Community</span>
        </h2>
        <p className="text-[#2a75b3] mt-3 max-w-xl mx-auto">
          Dive into stories from real travelers who explored with us!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-blue-200 transition-all flex flex-col"
          >
            <img
              src={story.touristImage}
              alt={story.touristName}
              className="w-full h-48 object-cover rounded-xl border border-blue-200 mb-4"
            />

            <h3 className="text-xl font-bold text-[#4194cc] mb-1">
              {story.touristName}
            </h3>
            <p className="text-sm font-semibold text-[#2a75b3] mb-2">
              {story.packageName}
            </p>
            <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">
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
                <span className="text-sm font-semibold text-[#4194cc]">Share</span>
              </FacebookShareButton>
            ) : (
              <button
                onClick={handleShare}
                className="text-sm text-blue-600 underline mt-auto"
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

export default Community;
