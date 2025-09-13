const { getCardApproval } = require('../src/cardService.js');
const { sendCardNotification } = require('../src/notificationService.js');
const { faker } = require('@faker-js/faker');

jest.mock('../src/notificationService.js', () => ({
  sendCardNotification: jest.fn(),
}));

describe('cardService', () => {
  beforeEach(() => {
    sendCardNotification.mockClear();
  });

  const testCases = Array.from({ length: 100 }, (_, i) => i + 1);

  test.each(testCases)('should correctly process random customer #%s', () => {
    // ARRANGE
    const randomCustomer = {
      name: faker.person.fullName(),
      age: faker.number.int({ min: 15, max: 70 }),
      income: faker.number.int({ min: 1500, max: 8000 }),
    };

    let expectedResult;
    if (randomCustomer.age < 18 || randomCustomer.income <= 2000) {
      expectedResult = 'NEGADO';
    } else if (randomCustomer.income > 5000) {
      expectedResult = 'PREMIUM';
    } else {
      expectedResult = 'BÁSICO';
    }

    // ACT
    const actualResult = getCardApproval(randomCustomer);

    // ASSERT
    expect(actualResult).toBe(expectedResult);
    expect(sendCardNotification).toHaveBeenCalledTimes(1);
    expect(sendCardNotification).toHaveBeenCalledWith(randomCustomer, expectedResult);
  });
});