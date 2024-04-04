import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/client.js'
import { createClientValidator } from '../validators/client.js'
import Phone from '../models/phone.js'
import Address from '../models/address.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query()

    return response.status(200).json(clients)
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    try {
      await request.validateUsing(createClientValidator)
      const clientBody = { name: body.name, cpf: body.cpf, seller_id: body.sellerId }
      const client = await Client.create(clientBody)

      const phoneBody = { clientId: client.id, number: body.numberPhone }
      await Phone.create(phoneBody)

      const addressBody = {
        clientId: client.id,
        country: body.country,
        state: body.state,
        city: body.city,
        neighborhood: body.neighborhood,
        number: body.numberHouse,
      }
      await Address.create(addressBody)

      return response.status(201).json({ id: client.id, name: client.name })
    } catch (error) {
      const message =
        error.code === 'ER_DUP_ENTRY' ? 'Duplicate entry cpf' : error.messages[0].message
      return { message }
    }
  }

  async show({ response, params }: HttpContext) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.status(404).json({ message: 'Client does not exist' })
    }

    await client.load('phone')
    await client.load('address')
    await client.load('sales')

    return response.status(200).json(client)
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    try {
      const client = await Client.find(params.id)
      await request.validateUsing(createClientValidator)

      if (!client) {
        return response.status(404).json({ message: 'Client does not exist' })
      }

      client.name = body.name
      client.cpf = body.cpf
      client.save()

      return response.status(200).json(client)
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }

  async destroy({ response, params }: HttpContext) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.status(404).json({ message: 'Client does not exist' })
    }

    client.delete()
    client.save()

    response.status(204)
  }
}
