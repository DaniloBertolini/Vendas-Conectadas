import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import { loginValidator } from '../validators/user.js'

const SECRET_KEY = process.env.SECRET_KEY || 'senhasecreta'

export default class LoginController {
  async signup({ request, response }: HttpContext) {
    const body = request.body()

    try {
      await request.validateUsing(loginValidator)

      const user = await User.findBy('email', body.email)
      if (user) {
        return response.status(409).json({ message: 'Duplicate entry email' })
      }

      body.password = await hash.make(body.password)

      const { email } = await User.create(body)

      return response.status(201).json({ email })
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await request.validateUsing(loginValidator)
      const user = await User.findBy('email', email)

      if (user) {
        if (await hash.verify(user.password, password)) {
          const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY)
          return response.status(200).json({ token })
        }

        return response.status(401).json({ message: 'Unauthorized User' })
      }

      return response.status(404).json({ message: 'User does not exist' })
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }
}
