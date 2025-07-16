
import 'reflect-metadata';
import { createHTTPServer, CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { awsLambdaRequestHandler } from  '@trpc/server/adapters/aws-lambda';
import { mergeRouters, router, procedure } from './trpc';
import { Responses as R } from './utils/responses';
import { createContext } from './context';
import env from './environment';

/**
 * 
 */
import { HomeRouter } from './routers/home.router';
import { FlowerRouter } from './routers/flower.router';

/**
 * 
 */
const appRouter = router({
    ...HomeRouter,
    flower: FlowerRouter
});


/**
 * 
 */
export type AppRouter = typeof appRouter;

/**
 * 
 */
export const handler = awsLambdaRequestHandler({
    router: appRouter, createContext
});

/**
 * 
 */
if (env.MODE === 'development') {
    createHTTPServer({
        router: appRouter,
        createContext: ({ req, res }: CreateHTTPContextOptions) => {
            return {
                headers: req?.headers ?? []
            }
        },
        onError: ({ error, type, path, input, ctx, req}) => {
            if (error.code === R.InternalServerError) {
                error.message = 'Internal server error'
            }

            if (error.code === R.Unauthorized) {
                error.message = 'Unauthorized'
                
            }

            return {  stack: '', data: {} }
        }
        
    })
    .listen(env.SERVER_PORT, () => console.info(`Running in development mode in the port: ${env.SERVER_PORT}`));
}

