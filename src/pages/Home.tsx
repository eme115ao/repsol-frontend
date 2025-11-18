import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="w-full max-w-3xl flex justify-between gap-6">
        {/* Conteúdo principal */}
        <div className="flex-1 bg-blue-950/50 p-6 rounded-xl shadow-md text-center border border-blue-800">
          <h1 className="text-2xl font-bold mb-8 text-yellow-400">
            Plataforma Repsol Invest
          </h1>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate("/deposito")}
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Depósito
            </button>
            <button
              onClick={() => navigate("/levantamento")}
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Levantamento
            </button>
            <button
              onClick={() => navigate("/convidar")}
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Convidar
            </button>
            <button
              onClick={() => navigate("/produtos")}
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Ver Produtos
            </button>
            <button
              onClick={() => navigate("/perfil")}
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Sobre nós
            </button>
          </div>

          <p className="mt-6 text-sm text-blue-300">
            🚀 Invista e veja seu rendimento crescer automaticamente!
          </p>
        </div>

        {/* Caixa lateral */}
        <div className="w-80 bg-blue-950/50 p-4 rounded-xl shadow-md border border-blue-800">
          <h2 className="font-bold text-yellow-400 mb-4">Ações rápidas</h2>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => navigate("/deposito")}
              className="bg-blue-800 hover:bg-blue-700 py-2 rounded-lg"
            >
              Depósito
            </button>
            <button
              onClick={() => navigate("/levantamento")}
              className="bg-blue-800 hover:bg-blue-700 py-2 rounded-lg"
            >
              Levantamento
            </button>
            <button
              onClick={() => navigate("/produtos")}
              className="bg-blue-800 hover:bg-blue-700 py-2 rounded-lg"
            >
              Produtos
            </button>
          </div>

          <div className="mt-6 text-sm text-blue-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-400" /> Ativar modo admin (demo)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
