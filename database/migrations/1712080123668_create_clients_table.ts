import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.string('cpf').notNullable().unique()

      table.integer('seller_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table
        .integer('address_id')
        .unsigned()
        .references('addresses.id')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
