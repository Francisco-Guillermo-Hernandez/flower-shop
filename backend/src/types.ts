import { DataSource } from 'typeorm';
import { FlowerValidator } from './validators/flower.validator';
import { DeleteValidator } from './validators/delete.validator';
import { OderValidatorValidator } from './validators/order.validator';
import { TypeOf, z, ZodType } from 'zod';
import { $ZodTypeInternals } from 'zod/v4/core/schemas.cjs';
import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import { IncomingHttpHeaders } from 'node:http';
import { Responses } from './utils/responses';

export type Params<TT extends z.ZodTypeAny> = { 
    input?: TypeOf<TT>; 
    ctx: { 
        dataSource: Promise<DataSource>,  
        headers?: IncomingHttpHeaders | APIGatewayProxyEventHeaders | null | undefined 
    },  
};

export type OderTypeValidator = typeof OderValidatorValidator;
export type FlowerTypeValidator = typeof FlowerValidator;
export type DeleteValidatorType = typeof DeleteValidator;
export type TRPCResponse = {
    status: Responses,
    data?: any,
    message?: string,
    meta?: any;
}


export interface ControllerBaseInterface<T extends ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>> {
    listAll({ ctx }: Params<any>): Promise<TRPCResponse>;
    findById({ ctx }: Params<any>): Promise<TRPCResponse>;
    listByFilter({ ctx }: Params<any>): Promise<TRPCResponse>;
    create({ ctx, input }: Params<T>): Promise<TRPCResponse>;
    update({ ctx, input }: Params<T>): Promise<TRPCResponse>;
    delete({ ctx, input }: Params<DeleteValidatorType>): Promise<TRPCResponse>;
}

