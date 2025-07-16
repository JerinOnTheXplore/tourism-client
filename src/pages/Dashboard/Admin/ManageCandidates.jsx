import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";

const ManageCandidates = () => {
  const queryClient = useQueryClient();

  // Fetch guide applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["guideApplications"],
    queryFn: async () => {
      const res = await axios.get("https://tourism-server-delta.vercel.app/api/guide-applications");
      return res.data;
    },
  });

  // Mutation for accepting an applicant
  const acceptMutation = useMutation({
    mutationFn: async (email) =>
      await axios.patch(`https://tourism-server-delta.vercel.app/api/guide-applications/accept/${email}`),
    onSuccess: () => {
      Swal.fire("Accepted!", "User promoted to tour guide.", "success");
      queryClient.invalidateQueries(["guideApplications"]);
    },
    onError: (err) => {
      Swal.fire("Error", err?.response?.data?.message || "Failed to accept", "error");
    },
  });

  // Mutation for rejecting an applicant
  const rejectMutation = useMutation({
    mutationFn: async (email) =>
      await axios.delete(`https://tourism-server-delta.vercel.app/api/guide-applications/reject/${email}`),
    onSuccess: () => {
      Swal.fire("Rejected!", "Application has been removed.", "info");
      queryClient.invalidateQueries(["guideApplications"]);
    },
    onError: (err) => {
      Swal.fire("Error", err?.response?.data?.message || "Failed to reject", "error");
    },
  });

  if (isLoading) return <div className="text-center py-6"><Loading></Loading></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Guide Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Title</th>
                <th>CV</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id}>
                  <td>{idx + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>
                    <span className="badge badge-info text-xs">Tourist</span>
                  </td>
                  <td>{app.title}</td>
                  <td>
                    <a
                      href={app.cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      View CV
                    </a>
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => acceptMutation.mutate(app.email)}
                      className="btn btn-sm btn-success"
                      disabled={acceptMutation.isPending}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(app.email)}
                      className="btn btn-sm btn-error"
                      disabled={rejectMutation.isPending}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCandidates;
