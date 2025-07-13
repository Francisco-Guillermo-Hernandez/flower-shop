import { DataSource } from 'typeorm';
import { Flower } from './entity/Flower';
import env from './environment'

/**
 * 
 * @returns 
 */
export const dataSource = async () => await new DataSource({
    type: 'mongodb',
    database: 'flower-shop',
    url: encodeURI(env.MONGODB_URI_DEV),
    synchronize: true,
    logging: false,
    entities: [Flower],
    migrations: [],
    subscribers: [],
}).initialize();