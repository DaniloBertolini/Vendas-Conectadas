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
    try {
      const client = await Client.findOrFail(params.id)
      await client.load('sales')

      return response.status(200).json({ data: client })
    } catch (error) {
      return response.status(404).json({ message: 'Client does not exist' })
    }
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    try {
      const client = await Client.findOrFail(params.id)
      await request.validateUsing(createClientValidator)

      client.name = body.name
      client.cpf = body.cpf

      client.save()

      return response.status(200).json({ data: client })
    } catch (error) {
      const { code, message } =
        error.code === 'ER_NO_REFERENCED_ROW_2'
          ? { code: 404, message: 'Client does not exist' }
          : { code: 422, message: error.messages[0].message }

      return response.status(code).json({ message })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const client = await Client.findOrFail(params.id)
      client.delete()
      client.save()

      response.status(204)
    } catch (error) {
      return response.status(404).json({ message: 'Client does not exist' })
    }
  }
}
