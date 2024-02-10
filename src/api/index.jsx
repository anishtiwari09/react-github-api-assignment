var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer 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"
);
import { BASE_URL } from "./config";
export const getAllUser = ({ per_page, page }) => {
  return fetch(`${BASE_URL}/users?since=${page}&per_page=${per_page}`, {
    method: "GET",

    headers: myHeaders,
  });
};
export const findSpecificUserDetails = (id) => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: myHeaders,
  });
};
