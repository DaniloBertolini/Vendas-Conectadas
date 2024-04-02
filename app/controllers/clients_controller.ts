import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/client.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query()

    response.status(200)

    return {
      data: clients,
    }
  }

  async store({ response, request }: HttpContext) {
    const body = request.body()

    const client = await Client.create(body)

    response.status(201)

    return {
      data: client,
    }
  }

  async show({ response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)

    await client.load('sales')

    response.status(200)

    return {
      data: client,
    }
  }

  async update({ response, request, params }: HttpContext) {
    const body = request.body()

    const client = await Client.findOrFail(params.id)

    client.name = body.name
    client.cpf = body.cpf

    client.save()

    response.status(200)

    return {
      data: client,
    }
  }

  async destroy({ response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)

    client.delete()
    client.save()

    response.status(204)
  }
}
