import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Phone from '../../app/models/phone.js'

export default class extends BaseSeeder {
  async run() {
    await Phone.createMany([
      {
        clientId: 1,
        number: 999999999,
      },
      {
        clientId: 2,
        number: 988888888,
      },
      {
        clientId: 3,
        number: 977777777,
      },
    ])
  }
}
