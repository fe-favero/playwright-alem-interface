const { seedUsers } = require('../playwright/support/database');

seedUsers()
  .then(() => {
    console.log("Seed de usuários concluído com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao fazer seed dos usuários:", error);
  })
  .finally(() => {
    process.exit();
  });