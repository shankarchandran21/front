import axios from 'axios';


let navigateFunction:()=>void;
export const setNavigateFunction = (navigate:()=>void) => {
  navigateFunction = navigate;
};
const authFetch = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials:true
});



authFetch.interceptors.request.use(
    (request) => {  
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {

      navigateFunction("/auth")
    }
    return Promise.reject(error);
  }
);

export default authFetch;