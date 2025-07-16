
import { router, procedure } from '../trpc'
import { FlowerController } from '../controllers/flower.controller';
import { FlowerValidator } from '../validators/flower.validator';
import { DeleteValidator } from '../validators/delete.validator';

const flowerController = new FlowerController();

/**
 * 
 */
export const FlowerRouter = router({
    list: procedure.meta({ authenticated: true }).query(({ctx}) => flowerController.listAll({ctx})),
    findById: procedure.meta({ authenticated: false }).query(({ctx}) => flowerController.findById({ctx})),
    create: procedure.meta({ authenticated: false }).input(FlowerValidator).mutation(({ctx, input}) => flowerController.create({ctx, input})),
    update: procedure.meta({ authenticated: false }).input(FlowerValidator).mutation(({ctx, input}) => flowerController.update({ctx, input})),
    delete: procedure.meta({ authenticated: false }).input(DeleteValidator).mutation(({ctx, input}) => flowerController.delete({ctx, input})),
});
