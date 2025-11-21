import { apiGet, endpoints } from "./api";

export async function getProducts() {
  return apiGet(endpoints.products);
}

export async function getProduct(id: string) {
  return apiGet(`${endpoints.products}/${id}`);
}
