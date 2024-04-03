import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.double('price').notNullable()
      table.string('description')
      table.integer('quantity').notNullable()

      table.boolean('active').defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
