
import { router, procedure } from '../trpc'


/**
 * 
 */
export const HomeRouter = {
    '': procedure.meta({ authenticated: false }).query(({ctx}) => 'Hello 👋'),
};