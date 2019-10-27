module.exports = {
    username: 'postgres',
    password: 'postgres',
    database: 'budget',
    host: '172.31.233.28',
    port: 5432,

    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    define: {
        // Define global model defaults
        timestamps: false
    }
};
