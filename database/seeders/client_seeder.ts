import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '../../app/models/client.js'

export default class extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        name: 'Joao',
        cpf: '12312312312',
        sellerId: 1,
        addressId: 1,
      },
      {
        name: 'Jose',
        cpf: '32132132132',
        sellerId: 1,
        addressId: 2,
      },
      {
        name: 'Maria',
        cpf: '12332112332',
        sellerId: 2,
        addressId: 2,
      },
    ])
  }
}
