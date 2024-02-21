require('dotenv').config();
export const configEnvironment = {
    PATH_CONFIG_ENV: process.env.NODE_ENV || 'development',
}