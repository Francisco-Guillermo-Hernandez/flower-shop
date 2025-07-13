
import 'reflect-metadata';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { awsLambdaRequestHandler } from  '@trpc/server/adapters/aws-lambda';
import { createContext } from './context';
import { mergeRouters } from './trpc';
import env from './environment';

/**
 * 
 */
import { FlowerRouter } from './routers/flower.router';

/**
 * 
 */
const appRouter = mergeRouters(FlowerRouter, );

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
    createHTTPServer({ router: appRouter })
        .listen(env.SERVER_PORT, () => console.info(`Running in development mode in the port: ${env.SERVER_PORT}`));
}

