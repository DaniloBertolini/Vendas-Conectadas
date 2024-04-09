import Address from '#models/address'
import Customer from '#models/customer'
import Phone from '#models/phone'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'
import { TypeCreate, TypeUpdate } from '../types.js'

export default class CustomersService {
  static async store({ request, body }: TypeCreate) {
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

      return { status: 201, data: { id: customer.id, name: customer.name } }
    } catch (error) {
      const message =
        error.code === 'ER_DUP_ENTRY' ? 'Duplicate entry cpf' : error.messages[0].message
      return { status: 201, data: { message } }
    }
  }

  static async show(id: number) {
    const customer = await Customer.find(id)

    if (!customer) {
      return { status: 404, data: { message: 'Customer does not exist' } }
    }

    await customer.load('phone')
    await customer.load('address')
    await customer.load('sales')

    return { status: 200, data: customer }
  }

  static async update({ request, body, id }: TypeUpdate) {
    try {
      const customer = await Customer.find(id)
      await request.validateUsing(updateCustomerValidator)

      if (!customer) {
        return { status: 404, message: 'Customer does not exist' }
      }

      customer.name = body.name
      customer.cpf = body.cpf
      customer.save()

      const phoneCustomer = await Phone.find(customer.id)

      if (phoneCustomer) {
        phoneCustomer.number = body.numberPhone
        phoneCustomer.save()
      }

      const addressCustomer = await Address.find(customer.id)

      if (addressCustomer) {
        addressCustomer.country = body.country
        addressCustomer.state = body.state
        addressCustomer.city = body.city
        addressCustomer.neighborhood = body.neighborhood
        addressCustomer.number = body.numberHouse
        addressCustomer.complement = body.complement || null
        addressCustomer.reference = body.reference || null
        addressCustomer.save()
      }

      return { status: 200, data: customer }
    } catch (error) {
      return { status: 422, data: { message: error.messages[0].message } }
    }
  }

  static async delete(id: number) {
    const customer = await Customer.find(id)

    if (!customer) {
      return { status: 404, data: { message: 'Customer does not exist' } }
    }

    customer.delete()
    customer.save()

    return { status: 204 }
  }
}
