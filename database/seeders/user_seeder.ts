import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'test@gmail.com',
        password: 'secretpassword',
      },
      {
        email: 'email@gmail.com',
        password: 'secret',
      },
    ])
  }
}
