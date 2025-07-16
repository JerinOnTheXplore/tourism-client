import axios from "axios";

export const createUserIfNotExists = async (user) => {
  if (!user?.email) return;

  try {
    await axios.post("https://tourism-server-delta.vercel.app/api/users", {
      email: user.email,
      displayName: user.displayName || "New User",
      photoURL: user.photoURL || "",
      role: "tourist", // default role
    });
  } catch (error) {
    // Ignore conflict if user already exists
    if (error.response?.status !== 409) {
      console.error("Failed to create user in DB:", error);
    }
  }
};
