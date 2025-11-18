// src/components/ProductCard.tsx
import React from "react";

type Props = {
  product: {
    id: number;
    nome: string;
    descricao?: string;
    valorMinimo: number;
    rendimento: number;
    duracaoDias: number;
    imagem?: string;
    ativo?: boolean;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 flex gap-4">
      <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {product.imagem ? (
          // imagem em public/assets/...
          // usamos caminho relativo a /assets/ para Vite
          <img src={product.imagem.startsWith("http") ? product.imagem : `/assets/${product.imagem}`} alt={product.nome} className="object-cover w-full h-full" />
        ) : (
          <div className="text-sm text-gray-500">Sem imagem</div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{product.nome}</h3>
          <div className="font-bold text-green-600">Kz {product.valorMinimo}</div>
        </div>

        <p className="text-sm text-gray-600 mt-1">{product.descricao}</p>

        <div className="flex gap-3 mt-3 text-xs text-gray-500">
          <div>Rendimento: {product.rendimento}%</div>
          <div>Duração: {product.duracaoDias} dias</div>
        </div>
      </div>
    </div>
  );
}
