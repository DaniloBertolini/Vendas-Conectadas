import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'test@gmail.com',
        password: await hash.make('senhasecreta'),
      },
      {
        email: 'email@gmail.com',
        password: await hash.make('secretasenha'),
      },
    ])
  }
}
