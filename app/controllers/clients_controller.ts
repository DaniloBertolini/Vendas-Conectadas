import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/client.js'
import { createClientValidator } from '../validators/client.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query()

    return response.status(200).json({ data: clients })
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    try {
      await request.validateUsing(createClientValidator)
      const client = await Client.create(body)
      return response.status(201).json({ data: client })
    } catch (error) {
      return response.status(422).json({ message: error.messages[0].message })
    }
  }

  async show({ response, params }: HttpContext) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.status(404).json({ message: 'Client does not exist' })
    }

    await client.load('address')
    await client.load('sales')

    return response.status(200).json({ data: client })
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

      return response.status(200).json({ data: client })
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
