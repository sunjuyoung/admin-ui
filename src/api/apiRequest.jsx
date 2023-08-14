import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiRequest.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === 401) {
      localStorage.removeItem("userInfo");
      // window.location.href = "/login";
    }
  },
  async (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      // window.location.href = "/login";
    }
  }
);

export default apiRequest;
