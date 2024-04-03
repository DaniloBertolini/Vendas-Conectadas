import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare password: string

  @hasMany(() => Client)
  declare clients: HasMany<typeof Client>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
