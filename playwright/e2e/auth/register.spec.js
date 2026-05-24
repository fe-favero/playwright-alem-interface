import { test, expect } from "../../support/fixtures"

import { getUser } from "../../support/factories/user";

test.describe("POST /auth/register", () => {
  

  test("deve cadastrar um novo usuário", async ({ auth }) => {
    //Preparação
    const user = getUser();

    //Ação
    const response = await auth.createUser(user);

    //Resultado Esperado
    await expect(response.status()).toBe(201);
    const responseBody = await response.json();
    await expect(responseBody).toEqual(
      expect.objectContaining({
        message: "Usuário cadastrado com sucesso!",
        user: expect.objectContaining({
          id: expect.any(String),
          name: user.name,
          email: user.email,
        }),
      }),
    );

    // Valida que o password NÃO é retornado na resposta
    await expect(responseBody.user).not.toHaveProperty("password");
  });

  test("não deve cadastrar quando o email já estiver em uso", async ({
    auth,
  }) => {
    const user = getUser();

    const preCondition = await auth.createUser(user);

    await expect(preCondition.status()).toBe(201);

    const response = await auth.createUser(user);

    await expect(response.status()).toBe(400);

    const responseBody = await response.json();

    await expect(responseBody).toEqual(
      expect.objectContaining({
        message: "Este e-mail já está em uso. Por favor, tente outro.",
      }),
    );
  });

  test("não deve cadastrar quando o email está incorreto", async ({
    auth,
  }) => {
    const user = {
      name: "Fernando Dias",
      email: "fernando.dias&example.com",
      password: "pwd123",
    };

    const response = await auth.createUser(user);

    await expect(response.status()).toBe(400);

    const responseBody = await response.json();

    await expect(responseBody).toEqual(
      expect.objectContaining({
        message: "O campo 'Email' deve ser um email válido",
      }),
    );
  });

  test("não deve cadastrar quando o nome não for informado", async ({
    auth,
  }) => {
    const user = {
      email: "fernando.dias@example.com",
      password: "pwd123",
    };

    const response = await auth.createUser(user);

    await expect(response.status()).toBe(400);

    const responseBody = await response.json();

    await expect(responseBody).toEqual(
      expect.objectContaining({
        message: "O campo 'Name' é obrigatório",
      }),
    );
  });

  test("não deve cadastrar quando o email não for informado", async ({
    auth,
  }) => {
    const user = {
      name: "Fernando Dias",
      password: "pwd123",
    };

    const response = await auth.createUser(user);

    await expect(response.status()).toBe(400);

    const responseBody = await response.json();

    await expect(responseBody).toEqual(
      expect.objectContaining({
        message: "O campo 'Email' é obrigatório",
      }),
    );
  });

  test("não deve cadastrar quando a senha não for informada", async ({
    auth,
  }) => {
    const user = {
      name: "Fernando Dias",
      email: "fernando.dias@example.com",
    };

    const response = await auth.createUser(user);

    await expect(response.status()).toBe(400);

    const responseBody = await response.json();

    await expect(responseBody).toEqual(
      expect.objectContaining({
        message: "O campo 'Password' é obrigatório",
      }),
    );
  });
});
