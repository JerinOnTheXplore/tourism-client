
import { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const application = {
      email: user.email,
      name: user.displayName,
      ...formData,
      status: "pending",
      appliedAt: new Date(),
    };

    const res = await axios.post("https://tourism-server-delta.vercel.app/api/guide-applications", application);

    Swal.fire({
      title: "Application Submitted!",
      text: res.data.message || "Your application to be a tour guide has been received.",
      icon: "success",
      confirmButtonText: "OK",
    });

    setFormData({ title: "", reason: "", cvLink: "" });
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: err?.response?.data?.message || err.message || "Something went wrong",
      icon: "error",
    });
  }
};

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-[#2a75b3]/60 dark:[#1a4f73]/60 mb-6">
        Join as Tour Guide
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Application Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Why do you want to be a tour guide?</label>
          <textarea
            name="reason"
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">CV Link (Google Drive, etc.)</label>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="btn w-full bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 hover:bg-slate-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JoinAsTourGuide;
