import type { HttpContext } from '@adonisjs/core/http'
import Customer from '../models/customer.js'

import CustomersService from '#services/customer_service'

export default class CustomersController {
  async index({ response }: HttpContext) {
    const customers = await Customer.query()

    return response.status(200).json(customers)
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    const res = await CustomersService.store({ request, body })

    return response.status(res.status).json(res.data)
  }

  async show({ response, params }: HttpContext) {
    const res = await CustomersService.show(params.id)

    return response.status(res.status).json(res.data)
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    const res = await CustomersService.update({ request, body, id: params.id })

    return response.status(res.status).json(res.data)
  }

  async destroy({ response, params }: HttpContext) {
    const res = await CustomersService.delete(params.id)

    response.status(res.status)
  }
}
