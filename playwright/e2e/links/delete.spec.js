import { test, expect } from "../../support/fixtures";

import { getUserWithLink } from "../../support/factories/user";
import { generateULID } from "../../support/utils";

test.describe("DELETE /api/links/:id", () => {
  
    const user = getUserWithLink();
    let token;
    
  test.beforeEach(async ({ auth }) => {
    await auth.createUser(user);
    token = await auth.getToken(user);
  });

  test("deve remover um link encurtado", async ({ links }) => {
    // Cria um link para o usuário e obtém o ID do link criado
    const linkId = await links.createAndReturnLinkId(user.link, token);

    // Remove o link criado
    const response = await links.removeLink(linkId, token);

    // Verifica se a resposta tem status 200 No Content
    expect(response.status()).toBe(200);

    // Verifica se a resposta tem a mensagem de sucesso
    const body = await response.json();
    expect(body.message).toBe("Link excluído com sucesso");
  });

  test("não deve remover quando o id não existe", async ({ links }) => {
    // Cria um link para o usuário e obtém o ID do link criado
    const linkId = generateULID();

    // Remove o link criado
    const response = await links.removeLink(linkId, token);

    // Verifica se a resposta tem status 404 Not Found
    expect(response.status()).toBe(404);

    // Verifica se a resposta tem a mensagem de sucesso
    const body = await response.json();
    expect(body.message).toBe("Link não encontrado");
  });
});
