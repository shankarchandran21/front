import axios from 'axios';
let navigateFunction;
export const setNavigateFunction = (navigate) => {
    navigateFunction = navigate;
};
const authFetch = axios.create({
    baseURL: 'https://hosting-7.onrender.com',
    withCredentials: true
});
authFetch.interceptors.request.use((request) => {
    return request;
}, (error) => {
    return Promise.reject(error);
});
authFetch.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
        navigateFunction("/auth");
    }
    return Promise.reject(error);
});
export default authFetch;
