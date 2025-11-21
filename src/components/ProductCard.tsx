// src/components/ProductCard.tsx
import React from "react";

type Product = {
  id: number;
  nome: string;
  preco: number; // preço em KZ
  retornoDiario?: number;
  duracaoDias?: number;
  imagem?: string | null;
};

export default function ProductCard({ product, onInvest }: { product: Product; onInvest?: (p: Product)=>void }) {
  const imgSrc = product.imagem ? `/assets/${product.imagem}` : "/assets/placeholder.png";

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 md:gap-6">
      <div className="flex-shrink-0">
        <img
          src={imgSrc}
          alt={product.nome}
          onError={(e: any) => (e.currentTarget.src = "/assets/placeholder.png")}
          className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover border"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg md:text-xl font-semibold text-gray-800">{product.nome}</div>
            <div className="text-sm text-gray-500 mt-1">
              Preço: <span className="font-semibold">{Number(product.preco).toLocaleString()} KZ</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Retorno diário: <span className="font-semibold">{Number(product.retornoDiario ?? 0).toLocaleString()} KZ</span>
            </div>
            <div className="text-sm text-gray-400">Duração: {product.duracaoDias ?? 150} dias</div>
          </div>

          <div className="ml-4 flex items-center">
            <button
              onClick={() => onInvest && onInvest(product)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
