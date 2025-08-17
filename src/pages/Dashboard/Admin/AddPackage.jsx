import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);

  // Handle form submit
  const onSubmit = async (data) => {
    if (images.length === 0) {
      return Swal.fire("Error", "Please add at least one image", "error");
    }

    const packageData = {
      name: data.name,
      gallery: images, // array of image URLs
      about: data.about,
      price: parseFloat(data.price),
      tourPlan: data.tourPlan,
    };

    try {
      const res = await axios.post(
        "https://tourism-server-delta.vercel.app/api/packages",
        packageData
      );
      if (res.data.insertedId || res.data.success) {
        Swal.fire("Success", "Package added successfully!", "success");
        reset();
        setImages([]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add package", "error");
    }
  };

  // Handle image add
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Handle image remove
  const handleRemoveImage = (url) => {
    setImages(images.filter((img) => img !== url));
  };

  return (
    <div className="max-w-4xl bg-base-100 mx-auto p-6  shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Add New Tour Package
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Package Name */}
        <div>
          <label className="block mb-1 font-semibold">Package Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full input input-bordered"
            placeholder="e.g. Cox's Bazar Sea Tour"
          />
        </div>

        {/* About */}
        <div>
          <label className="block mb-1 font-semibold">About the Tour</label>
          <textarea
            {...register("about", { required: true })}
            className="w-full textarea textarea-bordered"
            rows="4"
            placeholder="Write a brief description about the tour..."
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="w-full input input-bordered"
            placeholder="e.g. 199.99"
          />
        </div>

        {/* Tour Plan */}
        <div>
          <label className="block mb-1 font-semibold">Tour Plan (Day-wise)</label>
          <textarea
            {...register("tourPlan", { required: true })}
            className="w-full textarea textarea-bordered"
            rows="5"
            placeholder={`Day 1: Visit Cox’s Bazar beach\nDay 2: Explore Himchari & Inani...\nDay 3: Return`}
          ></textarea>
        </div>

        {/* Image Gallery */}
        <div>
          <label className="block font-semibold mb-1">Upload Images (You can select multiple)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full file:py-2 file:px-4 file:border-0 file:bg-[#2a75b3]/60 dark:file:bg-[#1a4f73]/60 file:rounded file:cursor-pointer"
          />
        </div>

        <button type="submit" className="btn bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 w-full">
          Save Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
