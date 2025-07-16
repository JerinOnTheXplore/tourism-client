import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import Loading from "../../loading/Loading";


const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "tourist", label: "Tourist" },
  { value: "tourGuide", label: "Tour Guide" },
  { value: "admin", label: "Admin" },
];

const fetchUsers = async ({ queryKey }) => {
  const [_key, { search, role }] = queryKey;
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (role && role !== "all") params.append("role", role);

  const res = await axios.get(`https://tourism-server-delta.vercel.app/api/users?${params.toString()}`);
  return res.data;
};

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", { search, role: roleFilter }],
    queryFn: fetchUsers,
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full md:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="w-full md:w-1/3">
          <Select
            options={roleOptions}
            defaultValue={roleOptions[0]}
            onChange={(option) => setRoleFilter(option.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <Loading/>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">No users found</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge capitalize ${user.role === "admin" ? "badge-error" : user.role === "tourGuide" ? "badge-success" : "badge-info"}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
