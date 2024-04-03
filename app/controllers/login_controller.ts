import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'senhasecreta'

export default class LoginController {
  async signup({ request, response }: HttpContext) {
    const body = request.body()
    body.password = await hash.make(body.password)

    const user = await User.create(body)

    response.status(201)

    return {
      data: user,
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)

    if (user && (await hash.verify(user.password, password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY)

      response.status(200)

      return {
        token,
      }
    }

    response.status(401)

    return {
      message: 'Unauthorized User',
    }
  }
}
