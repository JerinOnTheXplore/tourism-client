import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineTravelExplore } from "react-icons/md";
import Loading from "../loading/Loading";

const fetchGuide = async (id) => {
  const res = await axios.get(`https://tourism-server-delta.vercel.app/api/guides/${id}`);
  return res.data;
};

const fetchStoriesByGuide = async (email) => {
  const res = await axios.get(`https://tourism-server-delta.vercel.app/api/stories/by-guide?email=${email}`);
  return res.data;
};

const TourGuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch guide info
  const {
    data: guide,
    isLoading: isGuideLoading,
    isError: isGuideError,
  } = useQuery({
    queryKey: ["guide", id],
    queryFn: () => fetchGuide(id),
    enabled: !!id,
  });

  // Fetch stories by guide email
  const {
    data: stories = [],
    isLoading: isStoriesLoading,
    isError: isStoriesError,
  } = useQuery({
    queryKey: ["guide-stories", guide?.email],
    queryFn: () => fetchStoriesByGuide(guide.email),
    enabled: !!guide?.email,
  });

  if (isGuideLoading || isStoriesLoading) {
    return (
      <div className="text-center py-32 text-xl font-bold text-blue-800">
        <Loading />
      </div>
    );
  }

  if (isGuideError || isStoriesError) {
    return (
      <div className="text-center py-32 text-xl font-bold text-red-600">
        Failed to load data. Please try again.
      </div>
    );
  }

  return (
    <div className=" min-h-screen px-6 md:px-20 py-16 ">
      <div className="max-w-7xl mx-auto bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 rounded-3xl shadow-2xl p-8 md:p-14">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={guide.photo}
            alt={guide.name}
            className="w-44 h-44 rounded-full border-4 border-blue-300 shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{guide.name}</h1>
            <p className="text-md  mb-1">
              <strong>Email:</strong> {guide.email}
            </p>
            <p className="text-md  mb-1">
              <strong>Phone:</strong> {guide.phone || "N/A"}
            </p>
            <p className="text-md ">
              <strong>Experience:</strong> {guide.experience || "Not Specified"}
            </p>
          </div>
        </div>

        {/* Stories Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold  flex items-center gap-2 mb-6">
            <MdOutlineTravelExplore className="text-3xl " />
            <span className="">Stories by {guide.name}</span>
          </h2>

          {stories.length === 0 ? (
            <p className=" italic">This guide hasn’t added any stories yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story, idx) => (
                <div
                  key={idx}
                  className="bg-base-100 p-5 rounded-xl shadow-md border-l-4 border-blue-400"
                >
                  <h3 className="text-lg font-semibold  mb-1">
                    {story.touristName}'s Experience
                  </h3>
                  <p className="text-sm  font-medium mb-1">
                    Package: {story.packageName}
                  </p>
                  <p className=" text-sm italic">"{story.story}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-base font-bold px-5 py-2  shadow-md hover:bg-base-200 transition"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default TourGuideProfile;
