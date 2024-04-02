import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column()
  declare userId: number

  @column()
  declare addressId: number
  // @hasOne(() => User)
  // declare user_id: HasOne<typeof User>

  // @hasOne(() => Address)
  // declare address_id: HasOne<typeof Address>
}
