import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

import Loading from "../loading/Loading";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const fetchUserData = async (email) => {
  const userRes = await axios.get(
    `https://tourism-server-delta.vercel.app/api/users/${email}`
  );
  return userRes.data;
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  const {
    data: profile,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: () => fetchUserData(user.email),
  });

  useEffect(() => {
    if (profile && user && !form) {
      setForm({
        displayName: profile.displayName || user.displayName || "",
        email: user.email,
        photoURL: profile.photoURL || user.photoURL || "",
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

  if (isLoading || !form) return <p className="text-center py-20 "><Loading /></p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-base-300 rounded-xl shadow-md ">
      <h2 className="text-3xl font-bold text-center mb-4">Welcome, {form.displayName}!</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={form.photoURL || "https://i.ibb.co/YjX1gcv/default-avatar.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-300 object-cover"
        />
        <p className=" font-semibold mt-2 capitalize">Role: {form.role}</p>
      </div>

      {form.role === "admin" && (
        <AdminStats />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <InputField label="Name" name="displayName" value={form.displayName} handleChange={handleChange} disabled={!isEditing} />
        <InputField label="Email" value={form.email} disabled={true} />
        <InputField label="Photo URL" name="photoURL" value={form.photoURL} handleChange={handleChange} disabled={!isEditing} />
        <InputField label="Phone" name="phone" value={form.phone} handleChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="text-center mt-6">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="btn btn-outline mr-2">Save Changes</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-outline">Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60 hover:bg-slate-700">Edit Profile</button>
        )}
      </div>

      {form.role === "tourist" && (
        <div className="text-center mt-6">
          <button onClick={() => navigate("/dashboard/join-guide")} className="btn bg-[#2a75b3]/60 dark:bg-[#1a4f73]/60">Apply For Tour Guide</button>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, value, handleChange, disabled }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="input input-bordered w-full"
    />
  </div>
);

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("https://tourism-server-delta.vercel.app/api/admin-stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <Loading />;

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4">
      <Stat label="Total Payments" value={`৳ ${stats.totalPayments}`} />
      <Stat label="Total Tour Guides" value={stats.totalTourGuides} />
      <Stat label="Total Packages" value={stats.totalPackages} />
      <Stat label="Total Clients" value={stats.totalTourists} />
      <Stat label="Total Stories" value={stats.totalStories} />
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="p-4 border rounded bg-white shadow text-center">
    <p className="text-lg font-semibold text-slate-700">{label}</p>
    <p className="text-2xl font-bold text-blue-600 mt-1">{value}</p>
  </div>
);

export default ManageProfile;
