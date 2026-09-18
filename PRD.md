# PRD — Gestor de Notas Fiscais com IA

## Problema
Pequenas empresas e profissionais recebem várias notas fiscais (XML de NFe) por mês e
não têm uma forma simples de consolidar esses dados para entender gastos por
categoria e fornecedor. A conciliação manual é lenta e propensa a erro.

## Necessidade do usuário
Como usuário, quero importar minhas notas fiscais automaticamente e ver um resumo
categorizado dos meus gastos, para tomar decisões financeiras sem precisar
organizar planilhas manualmente.

## Funcionalidades
1. Importação de XML de NFe com extração automática de fornecedor, itens e valores
2. Categorização automática dos itens via IA (LLM)
3. Dashboard com total geral, gastos por categoria e por fornecedor
4. Exportação dos dados para Excel

## Fora de escopo (v1)
- Múltiplos usuários/autenticação
- Edição manual de categoria pelo usuário
- Suporte a outros tipos de nota (NFS-e, CT-e)

## Métricas de sucesso
- Nota importada corretamente em uma única chamada de API
- Categorização com taxa de erro de parse abaixo de 5%