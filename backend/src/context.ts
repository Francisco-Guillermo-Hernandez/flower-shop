import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export const createContext = ({ event, context }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({
    event: event,
    apiVersion: (event as {version?: string}).version ?? '1.0',
    user: event.headers['x-user'],
});

export type Context = Awaited<ReturnType<typeof createContext>>;

export const createLocalContext = ({event, context }: any ) => ({
    event: event,
    user: event.headers['x-user'],
    ...context
})

export type LocalContext = Awaited<ReturnType<typeof createLocalContext>>;