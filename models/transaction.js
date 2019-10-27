module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        expense_id:{
            type: type.INTEGER,
        },
        amount: {
            type: type.INTEGER,
            allowNull: false
        },
        type: {
            type: type.STRING,
            allowNull: false
        },
        wallet_id: {
            type: type.INTEGER,
            allowNull: false
        },
        transaction_date: {
            type: type.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {
        tableName: 'transaction',
        name :{
            plural: 'transactions',
            singular: 'transaction'
        }
    });
} 