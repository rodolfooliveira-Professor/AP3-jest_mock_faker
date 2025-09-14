// test/cardService.test.js
const { evaluateCard, sendCardNotification } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {

  // TODO: Gerar 100 clientes aleatórios usando faker
  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 16, max: 70 }),
    income: faker.number.float({ min: 1000, max: 10000 }),
  }));

  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: ${client.income}`, () => {
      // Cria um mock da função de notificação
      const mockNotify = jest.fn();

      // Chama a função que avalia o cartão
      const result = evaluateCard(client);

      // Chama o mock da função, passando o id do cliente e o resultado da avaliação
      mockNotify(client.id, result);

      // Verifica as regras de negócio
      if (client.age < 18 || client.income <= 2000) {
        expect(result).toBe("NEGADO");
      } else if (client.income > 5000) {
        expect(result).toBe("PREMIUM");
      } else {
        expect(result).toBe("BÁSICO");
      }

      // Valida se o mock foi chamado corretamente
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(client.id, result);
    });
  });
});