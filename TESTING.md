# Casos de teste

| # | Caso | Passos | Resultado esperado | Status |
|---|------|--------|---------------------|--------|
| 1 | Importar nota válida | POST /api/notas com XML válido | 201, nota criada com itens | ✅ |
| 2 | Importar nota duplicada | POST /api/notas com mesma chaveAcesso | 409, nota não duplicada | ✅ |
| 3 | Fornecedor repetido | Importar 2ª nota do mesmo CNPJ | Reaproveita fornecedor existente, não duplica | ✅ |
| 4 | Categorização automática | Verificar coluna `categoria` no banco após importação | Preenchida com categoria válida | ✅ |
| 5 | Dashboard agregado | GET /api/dashboard | Totais batem com soma dos itens no banco | ✅ |
| 6 | Exportação Excel | GET /api/exportar | Arquivo .xlsx baixa com formatação de moeda | ✅ |
| 7 | XML inválido | POST /api/notas com XML sem estrutura de NFe | Erro tratado, sem crash do servidor | ✅ |