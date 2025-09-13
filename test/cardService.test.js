// test/cardService.test.js
const { evaluateCard, sendCardNotification } = require("../src/cardService");
const cardService = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {
let mockNotify;

  // TODO: Criar mock da função de notificação
      beforeEach(() => {
        mockNotify = jest.spyOn(cardService, "sendCardNotification")
                        .mockImplementation(() => {});
      });

      afterEach(() => {
        mockNotify.mockRestore();
      });

  // TODO: Gerar 100 clientes aleatórios usando faker
  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 15, max: 80 }),
    income: faker.number.int({ min: 500, max: 10000 })
  }));

  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: ${client.income}`, () => {
     // TODO: Chamar a função que avalia o cartão
      const result = evaluateCard(client);

      // 3. Chamar o mock passando client.id e result
      cardService.sendCardNotification(client.id, result);

      // TODO: Verificar as regras de negócio com expect(...)
      if (/* condição cliente não aprovado */) {
        expect(result).toBe("NEGADO");
      } else if (/* condição premium */) {
        expect(result).toBe("PREMIUM");
      } else {
        expect(result).toBe("BÁSICO");
      }

      // TODO: Validar se o mock foi chamado corretamente
      expect(/* complete */).toHaveBeenCalledTimes(1);
      expect(/* complete */).toHaveBeenCalledWith(client.id, result);
    });
  });

});