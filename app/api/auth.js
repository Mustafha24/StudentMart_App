import client from "./client";

const login = async (email, password) => {
  try {
    const response = await client.post("/auth", { email, password });
    // console.log("Login successful:", response);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return { ok: false, data: error.response?.data || 'An error occurred' };
  }
}

export default {
  login,
};
