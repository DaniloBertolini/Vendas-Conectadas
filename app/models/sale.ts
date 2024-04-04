import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quantity: number

  @column()
  declare unitPrice: number

  @column()
  declare totalPrice: number

  @column()
  declare productId: number

  @column()
  declare customerId: number

  @column.dateTime({ autoCreate: true })
  declare dateSale: DateTime
}
