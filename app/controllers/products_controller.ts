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
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).json({ message: 'Product does not exist' })
    }
    return response.status(200).json({ data: product })
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    try {
      const product = await Product.find(params.id)

      if (!product) {
        return response.status(404).json({ message: 'Product does not exist' })
      }
      await request.validateUsing(createProductValidator)

      product.name = body.name
      product.price = body.price
      product.description = body.description
      product.quantity = body.quantity

      product.save()

      return response.status(200).json({ data: product })
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }

  async destroy({ response, params }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).json({ message: 'Product does not exist' })
    }

    product.$attributes.active = 0
    product.save()

    response.status(204)
  }

  async disabled({ response }: HttpContext) {
    const products = await Product.query().where('active', '=', '0').orderBy('name', 'asc')

    products.map((product) => delete product.$attributes.active)

    return response.status(200).json({ data: products })
  }
}
