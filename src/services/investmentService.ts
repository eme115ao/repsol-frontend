// src/services/investimentoService.ts
import { apiGet, apiPost } from "./api";

/**
 * Compra um produto de investimento.
 */
export async function comprarProduto(
  userId: number,
  productId: number,
  valor: number
) {
  return apiPost("/api/investments/comprar", {
    userId,
    productId,
    valor,
  });
}

/**
 * Lista os investimentos do usuário.
 */
export async function listarMeusInvestimentos(userId: number) {
  return apiGet(`/api/investments/meus/${userId}`);
}
