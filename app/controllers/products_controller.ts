import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'

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

    const product = await Product.create(body)

    response.status(201)

    return {
      data: product,
    }
  }

  async show({ response, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    response.status(200)

    return {
      data: product,
    }
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    const product = await Product.findOrFail(params.id)

    product.name = body.name
    product.price = body.price
    product.description = body.description
    product.quantity = body.quantity

    product.save()

    response.status(200)

    return {
      data: product,
    }
  }

  async destroy({ response, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    product.$attributes.active = 0
    product.save()

    response.status(204)
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
