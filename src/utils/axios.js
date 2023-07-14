/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import secureLocalStorage from "react-secure-storage";


export const axiosMain = axios.create({
  baseURL: 'http://localhost:2507',

  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*"
  }
});


const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/' });

// interceptor for http
axiosMain.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const accessToken = secureLocalStorage.getItem('t');
    if (accessToken) {

      const contentType = config.data instanceof FormData
        ? 'multipart/form-data'
        : 'application/json';
      config.headers['Content-Type'] = contentType;
      config.headers.Accept = 'application/json';
      config.headers.token = accessToken.token

    }
    else {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return config;
  },

  (error) => Promise.reject(error.response && error.response.data)
);

axiosMain.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
