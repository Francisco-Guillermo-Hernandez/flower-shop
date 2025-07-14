
import { router, procedure } from '../trpc'


/**
 * 
 */
export const HomeRouter = router({
    '': procedure.meta({ authenticated: false }).query(({ctx}) => 'Hello'),
});