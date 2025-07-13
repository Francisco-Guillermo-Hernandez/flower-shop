import { Flower } from '../entity/Flower'

type Params<T> = { ctx: any };

export const listAllFlowers = async ({ ctx }: Params<void>) => {
    const dataSource = await ctx.dataSource;
    
    try {
        const flowerRepository = dataSource.getRepository(Flower);
        return await flowerRepository.find();
    } catch (error) {
        return new Error("Failed to retrieve data from the server");
    }
}