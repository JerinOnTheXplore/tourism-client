import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";

const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPhoto, setNewPhoto] = useState("");

  useEffect(() => {
    axios
      .get(`https://tourism-server-delta.vercel.app/api/stories/all`)
      .then((res) => {
        const selected = res.data.find((item) => item._id === id);
        setStory(selected);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://tourism-server-delta.vercel.app/api/stories/${id}`, {
        title: story.title,
        description: story.description,
      });
      Swal.fire("Success", "Story updated successfully", "success");
      navigate("/dashboard/manage-stories");
    } catch (err) {
      Swal.fire(err, "Failed to update story", "error");
    }
  };

  const handleRemovePhoto = async (url) => {
  try {
    await axios.patch(
      `https://tourism-server-delta.vercel.app/api/stories/${id}/remove-image`,
      { imageUrl: url } 
    );
    setStory((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  } catch (err) {
    Swal.fire(err, "Failed to remove photo", "error");
  }
};


  const handleAddPhoto = async () => {
  if (!newPhoto) return;
  try {
    await axios.patch(
      `https://tourism-server-delta.vercel.app/api/stories/${id}/add-image`,
      { imageUrl: newPhoto } 
    );
    setStory((prev) => ({
      ...prev,
      images: [...(prev.images || []), newPhoto],
    }));
    setNewPhoto("");
  } catch (err) {
    Swal.fire(err, "Failed to add photo", "error");
  }
};


  if (loading || !story) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-700">Update Story</h2>

      <div className="grid gap-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={story.title || ""}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={story.description || ""}
            onChange={handleInputChange}
            rows="4"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Photos</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {story.images?.map((image, index) => (
              <div key={index} className="relative group">
                <img src={image} alt="story" className="rounded object-cover h-32 w-full" />
                <button
                  onClick={() => handleRemovePhoto(image)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded px-2 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="New photo URL"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              className="input input-bordered w-full"
            />
            <button onClick={handleAddPhoto} className="btn btn-info">
              Add
            </button>
          </div>
        </div>

        <button onClick={handleUpdate} className="btn bg-[#2a75b3] text-stone-50 mt-6">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateStory;
