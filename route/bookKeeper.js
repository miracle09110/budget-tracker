'use strict'

const {Transaction, Expense} = require('../sequelize');


function getTransaction(req, res){
    Transaction.findAll()
    .then(transactions => res.json(transactions))
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });;
}

function getSegmentedTransaction(req, res){
    Expense.findAll({
        include : [Transaction]
    })
    .then(expenses => {
        res.json(expenses);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
}


let BookKeeper = function(){
    this.getTransaction = getTransaction;
    this.getSegmentedTransaction = getSegmentedTransaction;
}


module.exports = new BookKeeper()


