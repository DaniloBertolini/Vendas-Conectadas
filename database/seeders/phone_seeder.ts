import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Phone from '../../app/models/phone.js'

export default class extends BaseSeeder {
  async run() {
    await Phone.createMany([
      {
        customerId: 1,
        number: 999999999,
      },
      {
        customerId: 2,
        number: 988888888,
      },
      {
        customerId: 3,
        number: 977777777,
      },
    ])
  }
}
