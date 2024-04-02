import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable()
      table.double('price')
      table.string('description')
      table.integer('quantity')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
