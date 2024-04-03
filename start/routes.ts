/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// import { middleware } from '#start/kernel'

const LoginController = () => import('../app/controllers/login_controller.js')
const SalesController = () => import('../app/controllers/sales_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')
const ProductsController = () => import('../app/controllers/products_controller.js')

const middleware = router.named({
  auth: () => import('#middleware/auth_middleware'),
})

router.group(() => {
  router.get('/healthy', async () => {
    return {
      backend: 'OK',
    }
  })

  router.post('signup', [LoginController, 'signup'])
  router.post('login', [LoginController, 'login'])
})

router
  .group(() => {
    router.get('products/disabled', [ProductsController, 'disabled'])
    router.resource('/products', ProductsController).apiOnly()
    router.resource('/clients', ClientsController).apiOnly()
    router.post('sales', [SalesController, 'store'])
  })
  .use(middleware.auth())
