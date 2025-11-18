import { Home, Package, Users, UserCircle2, PiggyBank } from "lucide-react";

interface SidebarProps {
  onNavigate: (route: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const itens = [
    { nome: "Início", icone: <Home size={18} />, rota: "home" },
    { nome: "Produtos", icone: <Package size={18} />, rota: "produtos" },
    { nome: "Convidar", icone: <Users size={18} />, rota: "convidar" },
    { nome: "Minha Conta", icone: <UserCircle2 size={18} />, rota: "minha" },
    { nome: "Perfil", icone: <PiggyBank size={18} />, rota: "perfil" },
  ];

  return (
    <aside className="w-60 bg-blue-900/60 border-l border-blue-800 text-white backdrop-blur-md hidden md:flex flex-col items-start py-6 px-4 space-y-3">
      <h3 className="text-lg font-semibold text-yellow-400 mb-3">Menu</h3>
      {itens.map((item) => (
        <button
          key={item.rota}
          onClick={() => onNavigate(item.rota)}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-blue-800/50 transition"
        >
          {item.icone}
          <span className="text-sm">{item.nome}</span>
        </button>
      ))}
    </aside>
  );
}
