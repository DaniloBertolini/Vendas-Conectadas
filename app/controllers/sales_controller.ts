import type { HttpContext } from '@adonisjs/core/http'
import SalesService from '#services/sale_service'

export default class SalesController {
  async store({ response, request }: HttpContext) {
    const body = request.body()

    const res = await SalesService.store({ request, body })

    return response.status(res.status).json(res.data)
  }
}
