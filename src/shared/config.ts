export interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface AppConfig {
    apiUrl: string;
    appPort: number;
    enviroment: string;
    database: DatabaseConfig;
    jwtSecretKey: string;
    jwtExpiresIn: string;
}

export const dbConfig: DatabaseConfig = {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
}

export const config: AppConfig = {
    apiUrl: process.env.API_URL,
    appPort: parseInt(process.env.PORT),
    enviroment: process.env.ENVIROMENT,
    database: dbConfig,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN
};