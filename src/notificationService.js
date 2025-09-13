// src/notificationService.js

function sendCardNotification(customer, status) {
  
  console.log(`Notificação enviada para ${customer.name} sobre o cartão ${status}`);
}

module.exports = { sendCardNotification };