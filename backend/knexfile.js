import path from 'path';
require('dotenv').config('.env');

module.exports = {
    client: process.env.DB_CLIENT,
    version: process.env.DB_VERSION,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
}