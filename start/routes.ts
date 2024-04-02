/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SalesController = () => import('../app/controllers/sales_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')
const ProductsController = () => import('../app/controllers/products_controller.js')

router.group(() => {
  router.get('/healthy', async () => {
    return {
      backend: 'OK',
    }
  })

  router.resource('/products', ProductsController).apiOnly()
  router.resource('/clients', ClientsController).apiOnly()
  router.post('sales', [SalesController, 'store'])
})
