import { authHandler, errorHandler, stackMiddlewares } from '@/lib/middlewares';

export default stackMiddlewares([authHandler, errorHandler]);
