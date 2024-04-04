import type { HttpContext } from '@adonisjs/core/http'
import Customer from '../models/customer.js'
import { createCustomerValidator } from '../validators/customer.js'
import Phone from '../models/phone.js'
import Address from '../models/address.js'

export default class CustomersController {
  async index({ response }: HttpContext) {
    const customers = await Customer.query()

    return response.status(200).json(customers)
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    try {
      await request.validateUsing(createCustomerValidator)
      const customerBody = { name: body.name, cpf: body.cpf, seller_id: body.sellerId }
      const customer = await Customer.create(customerBody)

      const phoneBody = { customerId: customer.id, number: body.numberPhone }
      await Phone.create(phoneBody)

      const addressBody = {
        customerId: customer.id,
        country: body.country,
        state: body.state,
        city: body.city,
        neighborhood: body.neighborhood,
        number: body.numberHouse,
      }
      await Address.create(addressBody)

      return response.status(201).json({ id: customer.id, name: customer.name })
    } catch (error) {
      const message =
        error.code === 'ER_DUP_ENTRY' ? 'Duplicate entry cpf' : error.messages[0].message
      return { message }
    }
  }

  async show({ response, params }: HttpContext) {
    const customer = await Customer.find(params.id)

    if (!customer) {
      return response.status(404).json({ message: 'Customer does not exist' })
    }

    await customer.load('phone')
    await customer.load('address')
    await customer.load('sales')

    return response.status(200).json(customer)
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    try {
      const customer = await Customer.find(params.id)
      await request.validateUsing(createCustomerValidator)

      if (!customer) {
        return response.status(404).json({ message: 'Customer does not exist' })
      }

      customer.name = body.name
      customer.cpf = body.cpf
      customer.save()

      return response.status(200).json(customer)
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }

  async destroy({ response, params }: HttpContext) {
    const customer = await Customer.find(params.id)

    if (!customer) {
      return response.status(404).json({ message: 'Customer does not exist' })
    }

    customer.delete()
    customer.save()

    response.status(204)
  }
}
