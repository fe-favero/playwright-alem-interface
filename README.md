# Playwright Além da Interface

Projeto de testes automatizados com Playwright cobrindo testes E2E, performance e integração API.

## 🚀 Estrutura do Projeto

- **`playwright/`** - Testes automatizados com Playwright
  - `e2e/` - Testes end-to-end (UI)
  - `support/` - Utilitários, fixtures e serviços
- **`docs/`** - Documentação das APIs (Collections Bruno)
- **`performance/`** - Testes de performance e carga
  - `tests/` - Cenários de teste
  - `data/` - Dados de entrada (CSV)
  - `reports/` - Relatórios de execução

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## ⚙️ Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrations do banco de dados (se aplicável)
npm run db:migrate
```

## 🧪 Executar Testes

```bash
# Testes E2E
npm run test:e2e

# Testes E2E com UI
npm run test:e2e:ui

# Testes de Performance
node performance/insert-users.js
npm run test:performance

# Limpar dados de teste
npm run db:cleanup
```

## 📊 Relatórios

- **Playwright Report**: Abra `playwright-report/index.html`
- **Performance Reports**: Verifique `performance/reports/`

## 🛠️ Stack de Tecnologia

- **Playwright** - Automação de testes
- **Node.js** - Runtime
- **PostgreSQL** - Banco de dados
- **Faker.js** - Geração de dados fake
- **Bruno** - Cliente API (documentação)

## 📝 Licença

MIT

## 👤 Autor

Fernando Favero Dias

---

Para mais informações, consulte a [documentação](./docs/bruno.json).
