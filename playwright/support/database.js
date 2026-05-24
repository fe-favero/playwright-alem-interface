const { Pool } = require("pg");
const { ulid } = require("ulid");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

async function seedUsers() {
  const client = await pool.connect();

  try {
    const plainPassword = "pwd123";
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const batchSize = 100;
    const totalUsers = 4000;
    let inserted = 0;
    const csvRows = ["name,email,password"];

    await client.query("BEGIN");

    for (let i = 0; i < totalUsers; i += batchSize) {
      const currentBatch = Math.min(batchSize, totalUsers - i);

      const valuePlaceholders = [];
      const values = [];

      for (let j = 0; j < currentBatch; j++) {
        const base = j * 4;
        valuePlaceholders.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`);

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const globalIndex = i + j;
        const username = `user.${globalIndex}`;
        const fullName = `${firstName} ${lastName}`;
        const email = `${username}@papito.dev`;

        values.push(ulid(), fullName, email, passwordHash);
        csvRows.push(`${fullName},${email},${plainPassword}`);
      }

      await client.query(
        `INSERT INTO users (id, name, email, password) VALUES ${valuePlaceholders.join(", ")}`,
        values
      );

      inserted += currentBatch;
      console.log(`Inseridos ${inserted}/${totalUsers} usuários...`);
    }

    await client.query("COMMIT");
    console.log("✅ Seed concluído! 4000 usuários inseridos.");

    const csvPath = path.resolve(__dirname, "users_seed.csv");
    fs.writeFileSync(csvPath, csvRows.join("\n"), "utf-8");
    console.log(`📄 CSV gerado em: ${csvPath}`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao fazer seed dos usuários:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

async function cleanupTestData() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      DELETE FROM links 
      WHERE user_id IN (
        SELECT id FROM users WHERE email LIKE '%@yahoo.com'
      )
    `);

    await client.query(`
      DELETE FROM users 
      WHERE email LIKE '%@yahoo.com'
    `);

    await client.query("COMMIT");
    console.log("Usuários e links de teste removidos com sucesso!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao limpar os dados de teste:", error);
  } finally {
    client.release();
  }
}

module.exports = { seedUsers, cleanupTestData };