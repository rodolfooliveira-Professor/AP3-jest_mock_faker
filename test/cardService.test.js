// test/cardService.test.js
const { evaluateCard, sendCardNotification } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {

  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 15, max: 80 }),
    income: faker.number.int({ min: 1000, max: 10000 })
  }));

  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: ${client.income}`, () => {

      const result = evaluateCard(client);
      const mockNotify = jest.fn();

      mockNotify(client.id, result);

      if (client.age < 18 || client.income <= 2000) {
        expect(result).toBe("NEGADO");
      } else if (client.income > 5000) {
        expect(result).toBe("PREMIUM");
      } else {
        expect(result).toBe("BÁSICO");
      }

      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(client.id, result);
    });
  });
});
