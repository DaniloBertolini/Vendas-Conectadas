import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'senhasecreta'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const authorization = ctx.request.header('Authorization')

    if (!authorization || authorization === '') {
      return ctx.response.send({
        message: 'Invalid Authorization',
      })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, SECRET_KEY)

    /**
     * Call next method in the pipeline and return its output
     */
    await next()
  }
}
