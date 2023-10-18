import axios from "axios";
import Cookie from "universal-cookie";
const cookie = new Cookie();

const getChecklistApi = () => {
  return axios.get(`${process.env.REACT_APP_API}checklist`, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  });
};

const postChecklistApi = (payload) => {
  return axios.post(`${process.env.REACT_APP_API}checklist`, payload, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  });
};

const deleteChecklistApi = (id) => {
  return axios.delete(`${process.env.REACT_APP_API}checklist/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  });
};

export { getChecklistApi, deleteChecklistApi, postChecklistApi };
