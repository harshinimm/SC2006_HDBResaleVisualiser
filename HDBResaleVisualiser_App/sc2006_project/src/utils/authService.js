import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const getAccessToken = async () => {
    let accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken && refreshToken) {
        try {
            const response = await axios.post(API_URL + "refresh/", { refresh: refreshToken });

            // Store new access token
            accessToken = response.data.access;
            localStorage.setItem("access_token", accessToken);
        } catch (error) {
            console.error("Token refresh failed:", error);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    }
    return accessToken;
};