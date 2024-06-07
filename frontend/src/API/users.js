import { baseRequest, getRandomObjectBaseRequest } from "./base";

export async function getAllUsers() {
  return await baseRequest({
    urlPath: "users/",
    method: "GET",
  });
}

export async function saveUser(user) {
  return await baseRequest({
    urlPath: "users/",
    method: "POST",
    body: user,
  });
}

export async function deleteUser(id) {
  return await baseRequest({
    urlPath: `users/${id}`,
    method: "DELETE",
  });
}

export async function getRandomUser() {
  return await getRandomObjectBaseRequest({ urlPath: "users" });
}
