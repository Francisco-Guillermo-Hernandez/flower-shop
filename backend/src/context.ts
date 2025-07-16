import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

type CreateContextOptions = { session: { user: string } | null; };

/**
 * 
 * @param param
 * @returns 
 */
export const createContext = ({ event, context }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({
    event: event,
    apiVersion: (event as {version?: string}).version ?? '1.0',
    user: event.headers['x-user'],
    session: { user: { userName: '' } },
    headers: event?.headers ?? []
});

export type Context = Awaited<ReturnType<typeof createContext>>;


/**
 * 
 * @param param
 * @returns 
 */
export const createAnotherContext = async ({ req, res }: CreateHTTPContextOptions) => ({
    headers: req?.headers ?? []
});

export type AnotherContext = Awaited<ReturnType<typeof createAnotherContext>>;
