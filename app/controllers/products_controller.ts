import type { HttpContext } from '@adonisjs/core/http'

import ProductService from '#services/product_service'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const res = await ProductService.index(1)

    return response.status(res.status).json(res.data)
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    const res = await ProductService.store({ request, body })

    return response.status(res.status).json(res.data)
  }

  async show({ response, params }: HttpContext) {
    const res = await ProductService.index(params.id)

    return response.status(res.status).json(res.data)
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    const res = await ProductService.update({ request, body, id: params.id })

    return response.status(res.status).json(res.data)
  }

  async destroy({ response, params }: HttpContext) {
    const res = await ProductService.delete(params.id)

    response.status(res.status).json(res.data)
  }

  async disabled({ response }: HttpContext) {
    const res = await ProductService.index(0)

    return response.status(res.status).json(res.data)
  }

  async enable({ response, params }: HttpContext) {
    const res = await ProductService.enable(params.id)

    return response.status(res.status).json(res.data)
  }
}
