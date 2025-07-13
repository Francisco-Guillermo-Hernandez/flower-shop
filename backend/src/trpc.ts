// import 'reflect-metadata';
import { TRPCError, initTRPC } from '@trpc/server';
import { dataSource } from './db';
import { MoreThan } from 'typeorm'


export interface ProcedureMeta {
    authenticated?: boolean;
}

const server = initTRPC.meta<ProcedureMeta>().create({
    defaultMeta: { authenticated: true }
});


/**
 * Midddlewares
 * 
 */
const dataSourceMiddleware = server.middleware(async ({ ctx, next }) => await next({ ctx: { ...ctx, dataSource: dataSource() }}));

export const router = server.router;
export const procedure = server.procedure.use(dataSourceMiddleware);
export const mergeRouters = server.mergeRouters;

