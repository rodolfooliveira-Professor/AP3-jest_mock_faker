function evaluateCard(client) {
  if (client.age < 18) return "NEGADO";
  if (client.income <= 2000) return "NEGADO";
  if (client.income > 5000) return "PREMIUM";
  return "BÁSICO";
}

// Função de notificação (mockável)
function sendCardNotification(clientId, cardType) {
  console.log(`Cliente ${clientId}: Cartão ${cardType} enviado.`);

 
}

module.exports = { evaluateCard, sendCardNotification };
