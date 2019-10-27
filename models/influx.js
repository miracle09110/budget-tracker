module.exports = (sequelize, type) => {
    return sequelize.define('influx', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        budgeted:{
            type: type.BOOLEAN,
            allowNull: false
        },
        description: {
            type: type.STRING,
            allowNull: false
        },
        amount: {
            type: type.INTEGER,
            allowNull: false
        },
        wallet_id: {
            type: type.INTEGER,
            allowNull: false
        },
        last_updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {
        tableName: 'influx',
        name :{
            plural: 'influxes',
            singular: 'influx'
        }
    });
} 