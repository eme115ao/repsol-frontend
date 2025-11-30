// src/pages/Regras.tsx
import React from "react";

export default function Regras() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Regras e Informações</h1>

      {/* SOBRE A REPSOL */}
      <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-slate-100">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Sobre a Repsol Angola
        </h2>

        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          A Repsol é uma empresa multinacional de energia e petroquímica fundada
          em 1987, com sede em Madrid. Opera nos setores de exploração,
          produção, petroquímica e distribuição de energia.
          <br /><br />
          A empresa atua em diversos continentes e é reconhecida por sua
          inovação, segurança e compromisso com o desenvolvimento sustentável.
          Em Angola, a Repsol opera através da Repsol Angola 22 B.V.,
          desempenhando atividades relevantes no setor energético.
        </p>

        <h2 className="text-lg font-semibold mb-2 text-gray-800">Missão e Valores</h2>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Missão: Proporcionar soluções seguras, acessíveis e eficientes,
          promovendo crescimento financeiro sustentável para os clientes.
        </p>

        <ul className="list-disc list-inside text-sm text-gray-600 mb-3 space-y-1">
          <li>Transparência e responsabilidade</li>
          <li>Compromisso com segurança e eficiência</li>
          <li>Foco no cliente e no parceiro</li>
          <li>Inovação contínua e melhoria dos serviços</li>
        </ul>
      </section>

      {/* REGRAS DA PLATAFORMA */}
      <section className="bg-white rounded-2xl shadow p-6 border border-slate-100">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Regras de Uso da Plataforma
        </h2>

        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-3 leading-relaxed">
          <li>
            <strong>Cadastro:</strong> Informar número de telefone válido e criar
            uma senha forte para proteger a conta.
          </li>

          <li>
            <strong>Investimentos:</strong> Cada produto tem valor mínimo,
            rendimento diário e prazo definidos. Os rendimentos são
            atualizados automaticamente.
          </li>

          <li>
            <strong>Referências:</strong> O usuário recebe um código exclusivo
            para convidar outros membros. Indicações falsas ou múltiplas contas
            não são permitidas.
          </li>

          <li>
            <strong>Depósitos & Saques:</strong> Depósitos devem ser realizados
            apenas nas contas oficiais da plataforma. Saques só são permitidos
            para contas bancárias cadastradas pelo próprio usuário.
          </li>

          <li>
            <strong>Histórico:</strong> Todas as operações ficam registradas e
            podem ser consultadas na área “Histórico”.
          </li>

          <li>
            <strong>Conduta:</strong> É proibido tentar manipular o sistema,
            criar contas falsas, burlar indicações ou simular transações. A
            conta pode ser bloqueada permanentemente.
          </li>

          <li>
            <strong>Suporte:</strong> Todos os atendimentos devem ser realizados
            exclusivamente pelos canais oficiais da plataforma.
          </li>

          <li>
            <strong>Alterações:</strong> A plataforma pode atualizar regras,
            valores ou produtos conforme necessário. Os usuários serão
            notificados quando houver mudanças importantes.
          </li>
        </ol>
      </section>
    </div>
  );
}
