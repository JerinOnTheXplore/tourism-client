import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Loading from "../loading/Loading";

const fetchProfile = async (email) => {
  const res = await axios.get(
    `https://tourism-server-delta.vercel.app/api/users/role/${email}`
  );
  return res.data;
};

const updateProfile = async ({ email, updates }) => {
  const res = await axios.patch(
    `https://tourism-server-delta.vercel.app/api/users/${email}`,
    updates
  );
  return res.data;
};

const ManageProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: () => fetchProfile(user.email),
  });

  useEffect(() => {
    if (profile && user && !form) {
      setForm({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || "",
        phone: profile.phone || "",
        role: profile.role || "tourist",
      });
    }
  }, [profile, user, form]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      Swal.fire("Success", "Profile updated!", "success");
      setIsEditing(false);
      queryClient.invalidateQueries(["userProfile", user.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    mutation.mutate({ email: user.email, updates: form });
  };

  if (isLoading || !form)
    return <p className="text-center py-20 text-slate-600"><Loading/></p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-slate-600 text-center">Manage Your Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={form.photoURL || "https://i.ibb.co/YjX1gcv/default-avatar.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-300 object-cover"
        />
        <p className="text-blue-600 font-semibold mt-2">Role: {form.role}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            value={form.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        {/* Role update for admin */}
        {profile?.role === "admin" && (
          <div>
            <label className="text-sm font-semibold">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={!isEditing}
              className="select select-bordered w-full"
            >
              <option value="tourist">Tourist</option>
              <option value="tourGuide">Tour Guide</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="btn btn-success mr-2">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-outline">
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn bg-gray-600 text-white hover:bg-slate-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;
