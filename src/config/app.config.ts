export const appConfig = {
    enviroment: process.env.ENVIRONMENT || 'development',
    port: process.env.PORT || 4000,
    apiUrl: process.env.API_URL,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    rapidApiHost: process.env.X_RAPIDAPI_HOST,
    rapidApiKey: process.env.X_RAPIDAPI_KEY
}