import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// ✅ Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Function to get a valid access token
export const getAccessToken = async () => {
    let accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken && refreshToken) {
        try {
            console.log("Refreshing access token...");
            const response = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken });

            // ✅ Store new access and refresh tokens
            accessToken = response.data.access;
            const newRefreshToken = response.data.refresh || refreshToken; // Ensure refresh token is stored

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", newRefreshToken);

        } catch (error) {
            console.error("Token refresh failed:", error);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return null;
        }
    }
    return accessToken;
};

// ✅ Automatically attach the Authorization header
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();  // ✅ Ensure token is always fresh
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Automatically handle expired tokens on responses
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Access token expired. Attempting refresh...");
            localStorage.removeItem("access_token"); // Remove old token

            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken });

                    // ✅ Store new access and refresh tokens
                    const newAccessToken = refreshResponse.data.access;
                    const newRefreshToken = refreshResponse.data.refresh || refreshToken;

                    localStorage.setItem("access_token", newAccessToken);
                    localStorage.setItem("refresh_token", newRefreshToken);

                    // ✅ Retry the original request with the new token
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(error.config);
                } catch (refreshError) {
                    console.error("Refresh token failed:", refreshError);
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login"; // Force logout if refresh fails
                }
            } else {
                window.location.href = "/login"; // Force logout if no refresh token
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
