import { createTRPCClient, httpBatchLink } from '@trpc/client';

import type {  AppRouter } from '../../backend/'

const client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:5050',
        }),
    ]
});

const main = async () => {
    try {
        const flowers = await client.list.query();
        console.log(flowers);
    } catch (error) {
        console.error(error);
    }
}


main().catch(_ => process.exit(1));