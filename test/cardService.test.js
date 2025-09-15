// test/cardService.test.js
const { evaluateCard, sendCardNotification } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {
  // Gerar 100 clientes aleatórios usando faker
  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 16, max: 80 }),
    income: faker.number.float({ min: 800, max: 15000, fractionDigits: 2 }),
  }));

  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: ${
      client.income
    }`, () => {
      // Chamar a função que avalia o cartão
      const result = evaluateCard(client);

      // Criar mock da função de notificação
      const mockNotify = jest.fn();

      // Chamar o mock passando client.id e result
      mockNotify(client.id, result);

      // Verificar as regras de negócio com expect(...)
      if (client.age < 18 || client.income <= 2000) {
        expect(result).toBe("NEGADO");
      } else if (client.income > 5000) {
        expect(result).toBe("PREMIUM");
      } else {
        expect(result).toBe("BÁSICO");
      }

      // Validar se o mock foi chamado corretamente
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(client.id, result);
    });
  });
});
