import axios from "axios";
import Cookie from "universal-cookie";
const cookie = new Cookie();

const getChecklistItemsApi = (id) => {
  return axios.get(`${process.env.REACT_APP_API}checklist/${id}/item`, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")}`,
    },
  });
};

export { getChecklistItemsApi };
