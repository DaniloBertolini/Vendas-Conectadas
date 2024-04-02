import type { HttpContext } from '@adonisjs/core/http'
import Sale from '../models/sale.js'

export default class SalesController {
  async store({ response, request }: HttpContext) {
    const body = request.body()

    const sale = await Sale.create(body)

    response.status(201)

    return {
      data: sale,
    }
  }
}
