// src/services/productService.ts
import { apiGet, apiPost } from "./api";

/**
 * Retorna todos os produtos ativos cadastrados no backend.
 */
export async function getAllProducts() {
  return apiGet("/api/products");
}

/**
 * Retorna os detalhes de um único produto.
 */
export async function getProductById(id: number | string) {
  return apiGet(`/api/products/${id}`);
}

/**
 * Envia compra de produto para o backend.
 * Backend cria registro em UserProduct e inicia contagem do rendimento.
 */
export async function buyProduct(userId: number, productId: number, amount: number) {
  return apiPost("/api/investments/buy", {
    userId,
    productId,
    amount,
  });
}
