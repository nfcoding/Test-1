import axios from "axios";

const registerApi = (payload) => {
  return axios.post(`${process.env.REACT_APP_API}register`, payload);
};

export { registerApi };
