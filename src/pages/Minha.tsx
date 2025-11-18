import React from "react";

const Minha: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Minha Conta</h1>
      <p className="text-gray-300 text-center max-w-2xl">
        Aqui você pode gerenciar as informações da sua conta, verificar seus
        investimentos ativos, rendimentos acumulados e editar seus dados de
        perfil.  
      </p>
      <p className="mt-6 text-yellow-400 font-semibold">
        ⚙️ Funções de edição e visualização estarão disponíveis no Dashboard.
      </p>
    </div>
  );
};

export default Minha;
