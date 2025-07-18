import { ZodObject, ZodString, ZodNumber, ZodOptional } from 'zod';
import { $strip } from 'zod/v4/core/schemas.cjs';
import { Flower } from '../entity/Flower'
import { Params, FlowerTypeValidator, ControllerBaseInterface, DeleteValidatorType, TRPCResponse } from '../types';
import { getId } from '../utils/getId';
import { Responses as R } from '../utils/responses';
import { TRPCError } from '@trpc/server';


export class FlowerController implements ControllerBaseInterface<FlowerTypeValidator> {
    
    /**
     * 
     * @param param
     * @returns 
     */
    public async listAll({ ctx }: Params<any>): Promise<TRPCResponse> {
        const dataSource = await ctx.dataSource;
        try {
            const flowerRepository = dataSource.getRepository(Flower);

            // Parse pagination values from headers, fallback to defaults if not present
            let sizePerPage = parseInt(ctx.headers?.['x-size-per-page'] as string) || 10;
            const page = parseInt(ctx.headers?.['x-page'] as string) || 1;

            if (sizePerPage > 20) {
                sizePerPage = 20;
            }

            const skip = (page - 1) * sizePerPage;
            const take = sizePerPage;

            const [data, total] = await flowerRepository.findAndCount({skip, take});

            return {
                status: R.Success,
                data,
                meta: {
                    total,
                    page,
                    sizePerPage,
                    totalPages: Math.ceil(total / sizePerPage)
                }
            };
        } catch (error) {
            throw new Error('Failed to retrieve data from the server');
        }
    }

    /**
     * 
     * @param param
     * @returns 
     */
    public async findById({ ctx, input }: Params<any>): Promise<TRPCResponse> {
        const dataSource = await ctx.dataSource;
        try {

            const id = ctx.headers?.['x-resource-id'];

            if (!id) {
                throw new TRPCError({ code: R.BadRequest, cause: 'There are no x-resource-id header', message: 'Add the x-resource-id header',  });
            }
            
            const flowerRepository = dataSource.getRepository(Flower);
            const flower = await flowerRepository.findOne({ where: { _id: getId(id) }});


            if (!flower) {
                return {
                    status: R.NotFound,
                    data: {},
                    message: ''
                };
            }
            return {
                status: R.Success, 
                data: flower,
                message: 'Data retrived sucessfully'
            };
        } catch (error: any) {
            throw new TRPCError({ code: error?.code?? '', cause: error.cause, message: error.message });
        }
    }

    /**
     * 
     * @param param
     * @returns 
     */
    public async listByFilter({ ctx, input }: Params<any>): Promise<TRPCResponse> {
        try {
          return {
            status: R.Success,
            data: {}, 
            message: ''
          }
        } catch (error) {
            throw new Error('Failed');
        }
    }

    /**
     * 
     * @param param
     * @returns 
     */
    public async create({ ctx, input }: Params<FlowerTypeValidator>): Promise<TRPCResponse> {
        const dataSource = await ctx.dataSource;
        try {
            const flowerRepository = dataSource.getRepository(Flower);
            await flowerRepository.save(new Flower(input));
            return {
                status: R.Success,
                data: {},
                message: 'The record was created ',
            };
        } catch (error: any) {
            throw new TRPCError({ code: error?.code?? '', cause: error.cause, message: error.message });
        }
    }


    /**
     * 
     * @param param
     * @returns 
     */
    public async update({ ctx, input }: Params<FlowerTypeValidator>): Promise<TRPCResponse> {
        const dataSource = await ctx.dataSource;
        try {

            const id = ctx.headers?.['x-resource-id'] || '';
            const flowerRepository = dataSource.getRepository(Flower);
            const flower = await flowerRepository.findOne({ where: { _id: getId(id) } });

            if (!flower) {
                throw new TRPCError({ code: R.NotFound, cause: 'Flower not found', message: 'Flower not found' });
            }

            Object.assign(flower, input);
            const result = await flowerRepository.update(getId(id), flower);
        
            if (result.affected === 0) {
                return {
                    status: R.NotModified,
                    data: {},
                    message:  `The element wasn't mofidied`
                };
            }

            return {
                status: R.Success,
                data: {},
                message: 'The element was modified successfully'
            };
        } catch (error: any) {
            throw new TRPCError({ code: error?.code?? '', cause: error.cause, message: error.message });
        }
    }

    /**
     * 
     * @param param
     * @returns 
     */
    public async delete({ ctx, input }: Params<DeleteValidatorType>): Promise<TRPCResponse> {
        const dataSource = await ctx.dataSource;
        try {
            const flowerRepository = dataSource.getRepository(Flower);
            const result = await flowerRepository.delete({ _id: getId(input?.id ?? '') });
            
            if ((result?.affected ?? 0) > 0) {
                return { 
                    status: R.Success,
                    data: {},
                    message: 'The element was removed successfully'
                };
            }

            throw new TRPCError({ code: R.BadRequest, cause: `The id of the element doesn't exist`, message: 'The element cannot be deleted',  });

        } catch (error: any) {
            throw new TRPCError({ code: error?.code?? '', cause: error.cause, message: error.message });
        }
    }
}