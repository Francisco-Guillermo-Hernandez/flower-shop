
import { TRPCError, initTRPC } from '@trpc/server';
import { Context, AnotherContext } from './context'
import { Responses as R } from './utils/responses';
import { dataSource } from './db';
import { ZodError } from 'zod';
import env from './environment'

type ProcedureMeta = {
    authenticated?: boolean;
}

const server = initTRPC
.context<AnotherContext | Context>()
.meta<ProcedureMeta>()
.create({
    defaultMeta: { authenticated: true },
    errorFormatter: ({ shape, error }) => {
    try {
      return {
        ...shape,
        message: JSON.parse(shape?.message ?? '{}'),
        data: {
          ...{
            ...shape.data,
            stack: env.MODE === 'developmen t' ? shape.data.stack : ''
          },
          zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    } catch (e: any) {
       return {
        ...shape,
        message: shape.message ?? '',
        data: {
          ...{
            ...shape.data,
            stack: env.MODE === 'developmen t' ? shape.data.stack : ''
          }
        },
      };
    }
  },
});


/**
 * Midddlewares
 * 
 */
const dataSourceMiddleware = server.middleware(async ({ ctx, next }) => await next({ ctx: { ...ctx, dataSource: dataSource() }}));
const authedProcedure = server.middleware(async ({ meta, next, ctx }) => {
  if (meta?.authenticated) {
    throw new TRPCError({ code: R.Unauthorized, cause: '', message: 'You are not authorized to do anything on this server' });
  }
  return next();
});

const passIncomingHeadersMiddleware = server.middleware(async ({ ctx, next }) => next({ ctx: {...ctx, headers: ctx?.headers ?? []} }));

export const router = server.router;
export const procedure = server.procedure.use(dataSourceMiddleware).use(authedProcedure).use(passIncomingHeadersMiddleware);
export const mergeRouters = server.mergeRouters;
