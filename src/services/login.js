import axios from "axios";

const loginApi = (payload) => {
  return axios.post(`${process.env.REACT_APP_API}login`, payload);
};

export { loginApi };
