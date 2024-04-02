import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('client_id').unsigned().references('clients.Id').onDelete('CASCADE')
      table.integer('number').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
