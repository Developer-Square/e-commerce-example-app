import { errorHandler, stackMiddlewares } from '@/lib/middlewares';

export default stackMiddlewares([errorHandler]);
