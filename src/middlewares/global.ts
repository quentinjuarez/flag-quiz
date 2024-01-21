import { applyMiddlewares } from './utils'
import dataMiddleware from './data'

const globalMiddleware = applyMiddlewares([dataMiddleware])

export default globalMiddleware
