import { faker } from "@faker-js/faker";

export class RandomCheckoutData {
  static generateCheckoutData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      //cardNumber: faker.string.numeric({ length: 16, exclude: ['0'] }),
      cardNumber: "1234 5678 9012 3456",
      expireDate: "12/28",
      cvcCard: faker.finance.creditCardCVV(),
    };
  }
}
