"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DashboardData {
  totalGeral: number;
  porCategoria: Record<string, number>;
  porFornecedor: Record<string, number>;
}

const CORES = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const formatar = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center text-gray-500">
        Carregando...
      </main>
    );
  }

  const dadosGrafico = Object.entries(data.porCategoria).map(([nome, valor]) => ({
    nome,
    valor,
  }));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Financeiro
          </h1>
          <a href="/api/exportar" download>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Exportar para Excel
            </button>
          </a>
        </div>

        {/* Card de total */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total gasto</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {formatar(data.totalGeral)}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Gráfico por categoria */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">
              Por categoria
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={dadosGrafico}
                  dataKey="valor"
                  nameKey="nome"
                  outerRadius={70}
                >
                {dadosGrafico.map((_, i) => (
                  <Cell key={i} fill={CORES[i % CORES.length]} />
                ))}
                </Pie>
                <Tooltip formatter={(v: any) => formatar(v)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Por fornecedor */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">
              Por fornecedor
            </h2>
            <ul className="space-y-3">
              {Object.entries(data.porFornecedor).map(([fornecedor, valor]) => (
                <li
                  key={fornecedor}
                  className="flex items-center justify-between border-b border-gray-100 pb-2 text-sm"
                >
                  <span className="text-gray-700">{fornecedor}</span>
                  <span className="font-medium text-gray-900">
                    {formatar(valor)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}