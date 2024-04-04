import type { HttpContext } from '@adonisjs/core/http'
import Sale from '../models/sale.js'
import { createSaleValidator } from '../validators/sale.js'

export default class SalesController {
  async store({ response, request }: HttpContext) {
    const body = request.body()

    try {
      await request.validateUsing(createSaleValidator)
      const sale = await Sale.create(body)

      return response.status(201).json(sale)
    } catch (error) {
      const { code, message } =
        error.code === 'ER_NO_REFERENCED_ROW_2'
          ? { code: 404, message: 'ProductId / ClientId does not exist' }
          : { code: 422, message: error.messages[0].message }

      return response.status(code).json({ message })
    }
  }
}
