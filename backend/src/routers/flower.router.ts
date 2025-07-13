
import { router, procedure } from '../trpc'
import { listAllFlowers } from '../controllers/flower.controller';

/**
 * 
 */
export const FlowerRouter = router({
    list: procedure.meta({ authenticated: false }).query(({ctx}) => listAllFlowers({ctx})),
});