// test/cardService.test.js
const { evaluateCard, sendCardNotification } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {

  // TODO: Gerar 100 clientes aleatórios usando faker
  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(), // Gera um ID único
    age: faker.number.int({ min: 10, max: 60 }), // Idade entre 10 e 60
    income: faker.number.int({ min: 1000, max: 10000 }) // Renda entre 1000 e 10000
  }));

  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: ${client.income}`, () => {
      // TODO: Chamar a função que avalia o cartão
      const result = evaluateCard(client);

      // TODO: Criar mock da função de notificação
      const mockNotify = jest.fn();

      // TODO: Chamar o mock passando client.id e result
      mockNotify(client.id, result);

      // TODO: Verificar as regras de negócio com expect(...)
      if (client.age < 18 || client.income <= 2000) {
        expect(result).toBe("NEGADO");
      } else if (client.income > 5000) {
        expect(result).toBe("PREMIUM");
      } else {
        expect(result).toBe("BÁSICO");
      }

      // TODO: Validar se o mock foi chamado corretamente
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(client.id, result);
    });
  });

});

