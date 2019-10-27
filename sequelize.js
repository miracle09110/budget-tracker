'use strict'
//NPM
const Sequelize = require('sequelize');

//MODEL
const ExpenseModel = require('./models/expense');
const WalletModel = require('./models/wallet');
const InfluxModel = require('./models/influx');
const TransactionModel = require('./models/transaction');

//CONFIG
const config = require('./config/dbConfig');

const sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    port: config.port,
    pool: config.pool,
    dialect: config.dialect,
    define: config.define
});


const Expense = ExpenseModel(sequelize, Sequelize);
const Wallet = WalletModel(sequelize, Sequelize);
const Influx = InfluxModel(sequelize,Sequelize);
const Transaction = TransactionModel(sequelize,Sequelize);

Wallet.hasMany(Influx, {foreignKey: 'wallet_id'});
Influx.belongsTo(Wallet,{foreignKey: 'wallet_id'});
Wallet.hasMany(Transaction,{foreignKey: 'wallet_id'});
Expense.hasMany(Transaction,{foreignKey: 'expense_id'});
Transaction.belongsTo(Wallet,{foreignKey: 'wallet_id'});
Transaction.belongsTo(Expense,{foreignKey: 'expense_id'});

module.exports= {
    Expense, 
    Wallet,
    Influx,
    Transaction
}