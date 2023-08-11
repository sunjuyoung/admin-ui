import apiRequest from "./apiRequest";

export const createStore = async (data) => {
  return await apiRequest.post("store/create", data, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  });
};

export const getStore = async (userId, storeId) => {
  return await apiRequest.get(`store/get/${storeId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  });
};
