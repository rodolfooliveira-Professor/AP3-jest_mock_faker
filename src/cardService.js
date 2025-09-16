function evaluateCard(client) {
  if (client.age < 18) return "NEGADO";
  if (client.income <= 2000) return "NEGADO";
  if (client.income > 5000) return "PREMIUM";
  return "BÁSICO";
}

// Função de notificação (mockável)
function sendCardNotification(clientId, cardType) {
  console.log(`Cliente ${clientId}: Cartão ${cardType} enviado.`);

  // TODO: Verificar as regras de negócio com expect(...)
  // DONE:Verificar as regras de negócio com expect(...)
  if (client.age < 18 || client.income <= 2000) {
    expect(result).toBe("NEGADO");
  } else if (client.income > 5000) {
    expect(result).toBe("PREMIUM");
  } else {
    expect(result).toBe("BÁSICO");
  }

  // TODO: Validar se o mock foi chamado corretamente
  // DONE: Validar se o mock foi chamado corretamente
  expect(mockNotify).toHaveBeenCalledTimes(1);
  expect(mockNotify).toHaveBeenCalledWith(client.id, result);
}

module.exports = { evaluateCard, sendCardNotification };
