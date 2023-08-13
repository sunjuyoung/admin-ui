import apiRequest from "./apiRequest";

/**
 * 스토어 생성
 * @param {*} data
 */
export const createStore = async (data) => {
  return await apiRequest.post("store/create", data, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  });
};

/**
 *  스토어 정보 가져오기
 * @param  userId ,storeId
 */
export const getStore = async (userId, storeId) => {
  return await apiRequest.get(`store/get/${storeId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  });
};

/**
 * 유저별 스토어 정보 가져오기
 * @param {string} userId
 *
 */
export const getStoreByUserId = async (userId) => {
  return await apiRequest.get(`store/${userId}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  });
};
