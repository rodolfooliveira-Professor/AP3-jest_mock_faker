const { sendCardNotification } = require('./notificationService.js');

function getCardApproval(customer) {
  let approvalStatus;

  // Aplica as regras de negócio
  if (customer.age < 18 || customer.income <= 2000) {
    approvalStatus = 'NEGADO';
  } else if (customer.income > 5000) {
    approvalStatus = 'PREMIUM';
  } else {
    approvalStatus = 'BÁSICO';
  }

  // Chama a função de notificação (que será mockada no teste)
  sendCardNotification(customer, approvalStatus);

  // Retorna o status final
  return approvalStatus;
}

module.exports = { getCardApproval };