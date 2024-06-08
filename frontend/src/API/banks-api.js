import { baseRequest, getRandomObjectBaseRequest } from "./base";

export async function getAllBanks() {
  return await baseRequest({
    urlPath: "banks/",
    method: "GET",
  });
}

export async function getBankById(id){
  return await baseRequest({
    urlPath: `banks/${id}/`,
    method: "GET"
  })
}

export async function saveBank(bank) {
  return await baseRequest({
    urlPath: "banks/",
    method: "POST",
    body: bank,
  });
}

export async function deleteBank(id) {
  return await baseRequest({
    urlPath: `banks/${id}`,
    method: "DELETE",
  });
}

export async function getRandomBank() {
  return await getRandomObjectBaseRequest({ urlPath: "banks" });
}
