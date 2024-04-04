import Sale from '#models/sale'
import { createSaleValidator } from '#validators/sale'
import { TypeCreate } from '../types.js'

export default class SalesService {
  static async store({ request, body }: TypeCreate) {
    try {
      await request.validateUsing(createSaleValidator)
      const sale = await Sale.create(body)

      return { status: 201, data: sale }
    } catch (error) {
      const { code, message } =
        error.code === 'ER_NO_REFERENCED_ROW_2'
          ? { code: 404, message: 'ProductId / CustomerId does not exist' }
          : { code: 422, message: error.messages[0].message }

      return { status: code, data: { message } }
    }
  }
}
