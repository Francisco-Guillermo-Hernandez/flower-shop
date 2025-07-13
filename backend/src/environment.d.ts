declare global {
    namespace NodeJs {
        
        interface Global {}

        interface ProcessEnv {
            NODE_ENV: string;
            SERVER_PORT: number;
            MONGODB_URI_DEV: string;
            MONGODB_TABLE_NAME: string;
        }
    }
}


export {};