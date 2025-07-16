
import { router, procedure } from '../trpc'
import { OderController } from '../controllers/order.controller';

const orderController = new OderController();

/**
 * 
 */
export const OrderRouter = router({
    list: procedure.meta({ authenticated: true }).query(({ctx}) => orderController.listAll({ctx})),
    create: procedure.meta({ authenticated: true }).mutation(({ctx, input}) => orderController.create({ctx, input})),
});