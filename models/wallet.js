module.exports = (sequelize, type) => {
    return sequelize.define('wallet', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: type.STRING,
            allowNull: false
        },
        type: {
            type: type.STRING,
            allowNull: false
        },
        last_updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {
        tableName: 'wallet',
        name :{
            plural: 'wallets',
            singular: 'wallet'
        }
    });
} 