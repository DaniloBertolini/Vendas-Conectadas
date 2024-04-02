import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.double('quantity')
      table.double('unit_price')
      table.double('total_price')
      table.timestamp('date_sale')

      table.integer('client_id').unsigned().references('clients.Id').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('products.Id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
