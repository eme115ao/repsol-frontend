import React from "react";

const Regras: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Regras da Plataforma Repsol
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl text-justify space-y-4">
        <p>
          🔸 A Repsol é uma plataforma de investimento segura e automatizada, que
          oferece rendimento diário com base nos produtos selecionados.
        </p>

        <p>
          🔸 Cada usuário deve utilizar apenas uma conta. Contas duplicadas serão
          permanentemente bloqueadas.
        </p>

        <p>
          🔸 Os rendimentos são calculados automaticamente todos os dias, e podem
          ser retirados após atingir o valor mínimo de saque.
        </p>

        <p>
          🔸 O saldo deve ser mantido na conta para gerar rendimento contínuo,
          conforme o plano ativo.
        </p>

        <p>
          🔸 Saques e depósitos são processados manualmente por administradores
          para garantir segurança e rastreabilidade.
        </p>

        <p>
          🔸 A plataforma reserva-se o direito de encerrar contas suspeitas de
          fraude, sem aviso prévio.
        </p>

        <p className="text-yellow-400 font-semibold text-center mt-6">
          ⚡ Invista com responsabilidade e acompanhe seus ganhos no Dashboard.
        </p>
      </div>

      <a
        href="/dashboard"
        className="mt-8 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
      >
        Voltar ao Dashboard
      </a>
    </div>
  );
};

export default Regras;
