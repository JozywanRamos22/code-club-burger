import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import CategorytController from './app/controllers/CategorytController'
import ProductController from './app/controllers/ProductController'
import OrderController from './app/controllers/OrderController'
import authMiddlewares from './app/middlewares/auth'
const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategorytController.store)
routes.get('/categories', CategorytController.index)
routes.put('/categories/:id', upload.single('file'), CategorytController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
