import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sale from '../../app/models/sale.js'

export default class extends BaseSeeder {
  async run() {
    await Sale.createMany([
      {
        customerId: 1,
        productId: 2,
        quantity: 2,
        unitPrice: 10,
        totalPrice: 20,
      },
      {
        customerId: 1,
        productId: 3,
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
      },
      {
        customerId: 2,
        productId: 1,
        quantity: 1,
        unitPrice: 5,
        totalPrice: 5,
      },
    ])
  }
}
