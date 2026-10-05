import axios from "axios";
import { API } from "../config/config";
import Cookie from "js-cookie";
import { getUserDetailsInLocalStorage } from "./UserDetails";
import { getLanguage } from "./LocalizationHelper";

const apiClient = axios.create({
  baseURL: API,
});

apiClient.interceptors.request.use(
  (config) => {
    // Add 'lang' as a query parameter from localStorage
    const lang = getLanguage();  // Get 'lang' from localStorage

    if (lang) {
      const separator = config.url.includes('?') ? '&' : '?'; // Check if the URL already has query params
      config.url = `${config.url}${separator}lang=${lang}`;  // Append the 'lang' query param
    }

    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;