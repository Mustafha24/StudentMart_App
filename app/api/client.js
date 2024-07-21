import { create } from "apisauce";
import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: settings.apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  try {
    const authToken = await authStorage.getToken("token");
    if (authToken) {
      request.headers["x-auth-token"] = authToken;
    }
  } catch (error) {
    console.error("Error retrieving auth token:", error);
  }
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  try {
    const response = await get(url, params, axiosConfig);
    console.log(response)
    if (response.ok) {
      cache.store(url, response.data);
      return response;
    }

    const cachedData = await cache.get(url);
    if (cachedData) {
      return { ok: true, data: cachedData };
    }

    return response;
  } catch (error) {
    console.error("API get request error:", error);
    const cachedData = await cache.get(url);
    if (cachedData) {
      return { ok: true, data: cachedData };
    }
    return { ok: false, problem: "NETWORK_ERROR" }; // Or a more specific error
  }
};

export default apiClient;
