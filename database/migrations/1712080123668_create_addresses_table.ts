import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('country').notNullable()
      table.string('state').notNullable()
      table.string('city').notNullable()
      table.string('neighborhood').notNullable()
      table.integer('number').notNullable()
      table.string('complement')
      table.string('reference')

      table
        .integer('client_id')
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
