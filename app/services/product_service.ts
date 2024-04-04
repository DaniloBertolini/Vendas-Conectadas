import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import { TypeCreate, TypeUpdate } from '../types.js'

export default class ProductsService {
  static async index(id: number) {
    const products = await Product.query().where('active', '=', `${id}`).orderBy('name', 'asc')

    const responseProducts = products.map((product) => ({
      id: product.$attributes.id,
      name: product.$attributes.name,
    }))

    return { status: 200, data: responseProducts }
  }

  static async store({ request, body }: TypeCreate) {
    try {
      await request.validateUsing(createProductValidator)
      const product = await Product.create(body)

      return { status: 201, data: product }
    } catch (error) {
      return { status: 422, data: { message: error.messages[0].message } }
    }
  }

  static async show(id: number) {
    const product = await Product.find(id)

    if (!product) {
      return { status: 404, data: { message: 'Product does not exist' } }
    }

    return { status: 200, data: product }
  }

  static async update({ request, body, id }: TypeUpdate) {
    try {
      const product = await Product.find(id)

      if (!product) {
        return { status: 404, data: { message: 'Product does not exist' } }
      }
      await request.validateUsing(createProductValidator)

      product.name = body.name
      product.price = body.price
      product.description = body.description
      product.quantity = body.quantity

      product.save()

      return { status: 200, data: product }
    } catch (error) {
      return { status: 422, data: { message: error.messages[0].message } }
    }
  }

  static async delete(id: number) {
    const product = await Product.find(id)

    if (!product) {
      return { status: 404, data: { message: 'Product does not exist' } }
    }

    product.$attributes.active = 0
    product.save()

    return { status: 204, data: '' }
  }

  static async enable(id: number) {
    const product = await Product.find(id)

    if (!product) {
      return { status: 404, data: { message: 'Product does not exist' } }
    }

    if (product.$attributes.active === 1) {
      return { status: 400, data: { message: 'Product is already active' } }
    }

    product.$attributes.active = 1
    product.save()

    return { status: 204, data: '' }
  }
}
