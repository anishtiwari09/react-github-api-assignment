import { BASE_URL } from "./config";
export const getAllUser = ({ per_page, page }) => {
  return fetch(`${BASE_URL}/users?since=${page}&per_page=${per_page}`, {
    method: "GET",
  });
};
export const findSpecificUserDetails = (id) => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
  });
};
