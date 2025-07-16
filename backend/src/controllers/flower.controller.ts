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
            
            return {
                status: R.Success,
                data: await flowerRepository.find()
            }
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

            console.log('id')
            console.log(id)

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
                // throw new TRPCError({ code: R.NotFound, cause: 'sample', message: 'sample',  });
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
                message: '',
            }
        } catch (error) {
            throw new Error('Failed to create flower');
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
            const flower = await flowerRepository.findOne(  { where: { _id: getId(id)  },  select: { _id: false} } );


               // ctx.headers
            // delete input?.id;
            // Object.assign(flower, input);
            // return await flowerRepository.update(input?.id ?? '', new Flower(input));

            return {
                status: R.Success,
                data: {},
                message: ''
            }
        } catch (error: any) {
            throw new Error(error?.message ?? '');
        }
    }

    public async delete({ ctx, input }: Params<DeleteValidatorType>): Promise<TRPCResponse> {
        const dataSource = await ctx.dataSource;
        try {
            const flowerRepository = dataSource.getRepository(Flower);
            const flower = await flowerRepository.findOneBy({ id: input?.id });
            if (!flower) {
                throw new Error('Flower not found');
            }
            await flowerRepository.remove(flower);
            return { 
                status: R.Success,
                data: {},
                message: ''
            };
        } catch (error) {
            throw new Error('Failed to delete flower');
        }
    }
}