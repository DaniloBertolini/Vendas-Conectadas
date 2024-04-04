import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('../user_seeder.js'))
    await this.seed(await import('../product_seeder.js'))
    await this.seed(await import('../customer_seeder.js'))
    await this.seed(await import('../address_seeder.js'))
    await this.seed(await import('../phone_seeder.js'))
    await this.seed(await import('../sale_seeder.js'))
  }
}
