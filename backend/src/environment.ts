
const env = {
    SERVER_PORT: process.env.SERVER_PORT ?? 5050,
    MODE:  process.env.MODE ?? 'development',
    MONGODB_URI_DEV: process.env.MONGODB_URI_DEV ?? '',
}

export default env;