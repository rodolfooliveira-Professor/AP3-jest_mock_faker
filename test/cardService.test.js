const { evaluateCard } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes de liberação de cartão", () => {

  const clientes = [];
  for (let i = 0; i < 100; i++) {
    clientes.push({
      id: faker.string.uuid(),
      age: faker.number.int({ min: 15, max: 70 }),
      income: faker.number.int({ min: 1000, max: 10000 })
    });
  }

  for (let i = 0; i < clientes.length; i++) {
    const cliente = clientes[i];

    test("Cliente " + (i + 1) + " idade " + cliente.age + " renda " + cliente.income, () => {
      const resultado = evaluateCard(cliente);

      const notificar = jest.fn();

      notificar(cliente.id, resultado);

      if (cliente.age < 18 || cliente.income <= 2000) {
        expect(resultado).toBe("NEGADO");
      } else if (cliente.income > 5000) {
        expect(resultado).toBe("PREMIUM");
      } else {
        expect(resultado).toBe("BÁSICO");
      }

      expect(notificar).toHaveBeenCalledTimes(1);
      expect(notificar).toHaveBeenCalledWith(cliente.id, resultado);
    });
  }

});
