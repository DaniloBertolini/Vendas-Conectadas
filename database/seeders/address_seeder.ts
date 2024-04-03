import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '../../app/models/address.js'

export default class extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        country: 'Brazil',
        state: 'state1',
        city: 'city1',
        neighborhood: 'test1',
        number: 123,
      },
      {
        country: 'Brazil',
        state: 'state2',
        city: 'city2',
        neighborhood: 'test2',
        number: 321,
      },
    ])
  }
}
