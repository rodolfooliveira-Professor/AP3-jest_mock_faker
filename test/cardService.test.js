const { evaluateCard, sendCardNotification } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

// Mock da função de notificação para este arquivo de teste
jest.mock("../src/cardService", () => ({
  ...jest.requireActual("../src/cardService"), 
  sendCardNotification: jest.fn(),
}));

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {
  // Gerar 100 clientes aleatórios usando faker
  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 15, max: 80 }), // 
    income: faker.number.int({ min: 1000, max: 10000 }), 
  }));

  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: ${
      client.income
    }`, () => {
     
      sendCardNotification.mockClear();

    
      const result = evaluateCard(client);

      if (result !== "NEGADO") {
        sendCardNotification(client.id, result);
      }

      if (client.age < 18 || client.income <= 2000) {
        expect(result).toBe("NEGADO");
        expect(sendCardNotification).toHaveBeenCalledTimes(0);
      } else if (client.income > 5000) {
        expect(result).toBe("PREMIUM");
        expect(sendCardNotification).toHaveBeenCalledTimes(1);
        expect(sendCardNotification).toHaveBeenCalledWith(client.id, "PREMIUM");
      } else {
        expect(result).toBe("BÁSICO");
        expect(sendCardNotification).toHaveBeenCalledTimes(1);
        expect(sendCardNotification).toHaveBeenCalledWith(client.id, "BÁSICO");
      }
    });
  });
});
