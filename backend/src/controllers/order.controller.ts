import { Order } from '../entity/Order';
import { Responses as R } from '../utils/responses';
import { ControllerBaseInterface, DeleteValidatorType, OderTypeValidator, Params, TRPCResponse } from '../types';

export class OderController implements ControllerBaseInterface<OderTypeValidator> {
    public async listAll({ ctx }: Params<any>): Promise<TRPCResponse> {
        return { status: R.Success, data: {}, message: '' };
    }

    public async findById({ ctx, input }: Params<any>): Promise<TRPCResponse> {
       return { status: R.Success, data: {}, message: '' };
    }

    public async listByFilter({ ctx, input }: Params<any>): Promise<TRPCResponse> {
       return { status: R.Success, data: {}, message: '' };
    }

    public async create({ ctx, input }: Params<OderTypeValidator>): Promise<TRPCResponse> {
       return { status: R.Success, data: {}, message: '' };
    }

    public async update({ ctx, input }: Params<OderTypeValidator>): Promise<TRPCResponse> {
      return { status: R.Success, data: {}, message: '' };
    }

    public async delete({ ctx, input }: Params<DeleteValidatorType>): Promise<TRPCResponse> {
        return { status: R.Success, data: {}, message: '' };
    }
}

