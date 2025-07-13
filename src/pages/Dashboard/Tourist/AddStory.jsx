// AddStory.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";


const AddStory = () => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [packageName, setPackageName] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packageName || !story || images.length === 0) {
      return Swal.fire("Error", "Please fill in all fields and add at least one image", "error");
    }

    try {
      
      const uploadedImageUrls = await Promise.all(
        images.map(async (img) => {
          const formData = new FormData();
          formData.append("image", img);
          const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            formData
          );
          return res.data.data.url;
        })
      );

      const newStory = {
        packageName,
        story,
        images: uploadedImageUrls,
        guideEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post("https://tourism-server-delta.vercel.app/api/stories", newStory);

      if (res.data.success) {
        Swal.fire("Success", "Story added successfully!", "success");
        navigate("/dashboard/manage-story");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add story", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-[#2a75b3] mb-6">📝 Add a New Story</h2>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Enter story title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            rows="6"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write your story here..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Images (You can select multiple)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full file:py-2 file:px-4 file:border-0 file:bg-[#2a75b3] file:text-white file:rounded file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-[#2a75b3] hover:bg-[#2a74a0] text-white px-6 py-2 rounded shadow w-full"
        >
          Submit Story
        </button>
        <button
              onClick={() => navigate(-1)}
              className="bg-[#2a75b3] text-stone-50 font-semibold px-5 py-2 rounded shadow-md hover:bg-[#2a75b3] transition w-full mb-4"
            >
              ← Go Back
            </button>
      </form>
    </div>
  );
};

export default AddStory;
