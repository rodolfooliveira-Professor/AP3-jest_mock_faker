// test/cardService.test.js

// 1. Importa as funções do arquivo de serviço e a biblioteca faker
const { evaluateCard, sendCardNotification } = require("../src/cardService");
const { faker } = require("@faker-js/faker");

describe("Testes dinâmicos de liberação de cartão com Faker e Mock", () => {
  
  // 2. GERAÇÃO DE CLIENTES ALEATÓRIOS
  // Gera um array com 100 clientes usando dados aleatórios do Faker
  const clients = Array.from({ length: 100 }).map(() => ({
    id: faker.string.uuid(), // Gera um ID único
    age: faker.number.int({ min: 10, max: 90 }), // Gera idade entre 10 e 90
    income: faker.number.int({ min: 500, max: 15000 }), // Gera renda entre 500 e 15000
  }));

  // 3. EXECUÇÃO DOS TESTES
  // Roda um teste para cada cliente gerado
  clients.forEach((client, index) => {
    test(`Cliente #${index + 1} -> idade: ${client.age}, renda: R$${client.income}`, () => {
      
      // 4. CHAMADA DA FUNÇÃO PRINCIPAL
      // Chama a função que avalia o cartão, passando o cliente atual
      const result = evaluateCard(client);

      // 5. CRIAÇÃO DO MOCK
      // Cria um mock (simulação) da função de notificação
      const mockNotify = jest.fn(sendCardNotification);

      // 6. CHAMADA DO MOCK
      // Chama o mock, passando o ID do cliente e o resultado da avaliação
      mockNotify(client.id, result);

      // 7. VERIFICAÇÃO DAS REGRAS DE NEGÓCIO
      // Verifica se o resultado está correto de acordo com a idade e a renda
      if (client.age < 18 || client.income <= 2000) {
        expect(result).toBe("NEGADO"); // Espera "NEGADO" se for menor de idade ou tiver renda baixa
      } else if (client.income > 5000) {
        expect(result).toBe("PREMIUM"); // Espera "PREMIUM" se a renda for alta
      } else {
        expect(result).toBe("BÁSICO"); // Nos outros casos, espera "BÁSICO"
      }

      // 8. VALIDAÇÃO DO MOCK
      // Valida se a função de notificação (mock) foi chamada corretamente
      expect(mockNotify).toHaveBeenCalledTimes(1); // Garante que foi chamada apenas uma vez
      expect(mockNotify).toHaveBeenCalledWith(client.id, result); // Garante que foi chamada com os parâmetros corretos
    });
  });
});
