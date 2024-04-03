import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare country: string

  @column()
  declare state: string

  @column()
  declare city: string

  @column()
  declare neighborhood: string

  @column()
  declare number: number

  @column()
  declare complement: string

  @column()
  declare reference: string

  @column()
  declare clientId: number
}
