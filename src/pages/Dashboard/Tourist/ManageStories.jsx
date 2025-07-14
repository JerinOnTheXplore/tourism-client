import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";


const ManageStories = () => {
  const { user } = useAuth();

  const { data: stories = [], refetch, isLoading } = useQuery({
    queryKey: ["myStories", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://tourism-server-delta.vercel.app/api/stories/user/${user.email}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this story?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://tourism-server-delta.vercel.app/api/stories/${id}`);
          Swal.fire("Deleted!", "Your story has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire(error, "Failed to delete story", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <div className="text-center font-semibold py-20">Loading your stories...</div>;
  }

  if (stories.length === 0) {
    return <div className="text-center font-medium text-gray-500 py-20">No stories found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Your Added Stories</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={story.touristImage || "/default-user.jpg"}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{story.touristName}</h3>
                <p className="text-sm text-gray-500 font-bold">{story.packageName}</p>
              </div>
            </div>
            <p className="text-gray-700 font-semibold mb-3">{story.story.slice(0, 100)}...</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {story.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Story"
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>
            <div className="flex justify-between">
              <Link
                to={`/dashboard/update-story/${story._id}`}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(story._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
