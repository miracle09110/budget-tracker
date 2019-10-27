module.exports = (sequelize, type) => {
    return sequelize.define('expense', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: type.STRING,
            allowNull: false
        },
        priority: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.STRING,
            allowNull: false
        },
        amount_per_month: {
            type: type.INTEGER,
            allowNull: false
        },
        valid_from: {
            type: type.DATE,
            allowNull: false
        },
        valid_till: {
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
        tableName: 'expense',
        name :{
            plural: 'expenses',
            singular: 'expense'
        }
    });
} 