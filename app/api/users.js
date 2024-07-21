import client from "./client";

const endpoint = "/users";

const register = (userInfo) => {
  // console.log("User Info:", userInfo);

  return client.post(endpoint, userInfo)
    .then(response => {
      // console.log("Register successful:", response);
      return response;
    })
    .catch(error => {
      console.error("Register failed:", error);
      // Return an object that matches the format expected in onSubmit
      return { ok: false, data: { error: error.message || 'Registration failed' } };
    });
}

const getUserById = (userId) => client.get(`${endpoint}/${userId}`);

const updateUserById = (userId, update) => client.put(`${endpoint}/${userId}`, update);

export default { register, getUserById, updateUserById };
