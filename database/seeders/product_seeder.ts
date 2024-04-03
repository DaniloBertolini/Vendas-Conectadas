import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'mouse',
        price: 5,
        description: 'gaming mouse',
        quantity: 2,
      },
      {
        name: 'keyboard',
        price: 10,
        description: 'gaming keyboard',
        quantity: 4,
      },
      {
        name: 'screen',
        price: 15,
        description: 'gaming screen',
        quantity: 3,
      },
    ])
  }
}
