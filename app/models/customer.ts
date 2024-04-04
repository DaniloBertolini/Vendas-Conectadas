import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Sale from './sale.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import Phone from './phone.js'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column()
  declare sellerId: number

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasOne(() => Phone)
  declare phone: HasOne<typeof Phone>
}
