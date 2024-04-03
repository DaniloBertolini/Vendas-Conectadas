import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'
import { createProductValidator } from '../validators/product.js'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query().where('active', '=', '1').orderBy('name', 'asc')

    products.map((product) => delete product.$attributes.active)

    response.status(200)

    return {
      data: products,
    }
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    try {
      const payload = await request.validateUsing(createProductValidator)
      await Product.create(body)

      response.status(201)
      return {
        data: payload,
      }
    } catch (error) {
      return {
        message: error.messages[0].message,
      }
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)

      response.status(200)

      return {
        data: product,
      }
    } catch (error) {
      return {
        message: 'Product does not exist',
      }
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

      response.status(200)

      return {
        data: product,
      }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return {
          message: 'Product does not exist',
        }
      }

      return {
        message: error.messages[0].message,
      }
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)

      product.$attributes.active = 0
      product.save()

      response.status(204)
    } catch (error) {
      return {
        message: 'Product does not exist',
      }
    }
  }

  async disabled({ response }: HttpContext) {
    const products = await Product.query().where('active', '=', '0').orderBy('name', 'asc')

    products.map((product) => delete product.$attributes.active)

    response.status(200)

    return {
      data: products,
    }
  }
}
