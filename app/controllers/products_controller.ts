import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'
import { createProductValidator } from '../validators/product.js'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query().where('active', '=', '1').orderBy('name', 'asc')

    products.map((product) => delete product.$attributes.active)

    return response.status(200).json({ data: products })
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    try {
      await request.validateUsing(createProductValidator)
      const product = await Product.create(body)

      return response.status(201).json({ data: product })
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)

      return response.status(200).json({ data: product })
    } catch (error) {
      return response.status(404).json({ message: 'Product does not exist' })
    }
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    try {
      const product = await Product.findOrFail(params.id)
      await request.validateUsing(createProductValidator)

      product.name = body.name
      product.price = body.price
      product.description = body.description
      product.quantity = body.quantity

      product.save()

      return response.status(200).json({ data: product })
    } catch (error) {
      const { code, message } =
        error.code === 'ER_NO_REFERENCED_ROW_2'
          ? { code: 404, message: 'Product does not exist' }
          : { code: 422, message: error.messages[0].message }

      return response.status(code).json({ message })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)

      product.$attributes.active = 0
      product.save()

      response.status(204)
    } catch (error) {
      return response.status(404).json({ message: 'Product does not exist' })
    }
  }

  async disabled({ response }: HttpContext) {
    const products = await Product.query().where('active', '=', '0').orderBy('name', 'asc')

    products.map((product) => delete product.$attributes.active)

    return response.status(200).json({ data: products })
  }
}
