import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare password: string

  @hasMany(() => Customer)
  declare customers: HasMany<typeof Customer>
}
