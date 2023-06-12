import axios from "axios";

// Set config defaults when creating the instance
const myAxios = axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 10000
});
myAxios.defaults.withCredentials = true; // 允许携带 cookie
// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log("myAxios" , response)
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;
