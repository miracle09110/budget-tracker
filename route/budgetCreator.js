'use strict'
//NPM
const moment = require('moment-timezone');
const Sequelize = require('sequelize');

const {Expense, Transaction, Influx} =  require('../sequelize');

const Op = Sequelize.Op

function getBudget(req, res){
    const year = req.params.year;
    const month = req.params.month;
    let date = new Date(year,month,1);
    const start = moment(date).format('YYYY-MM-DD');
    date.setMonth(date.getMonth() + 1);
    const end = moment(date).format('YYYY-MM-DD');
    Expense.findAll({
        where :{
            valid_till :{
                [Op.gte] : start.toString()
            },
            valid_from : {
                [Op.lte] : end.toString()
            }
        },
        include: [{
            model: Transaction,
        }],
        order : [['priority','ASC']]
    }).then(expenses => {
        let total = 0; 
        let i = 0;
        for (i=0; i< expenses.length; i ++){

            total += expenses[i].amount_per_month;
        }
        if(i >= expenses.length) {
            console.log(`Total Budget for the Month ${total}`);
            let budget = {
                total : total,
                expenses: expenses
            }
            res.json(budget);
        }
        
    }).catch((err) =>{
        console.log(err);
        res.sendStatus(500);
    });
}

function expenses(req,res){
    Expense.findAll()
    .then(expenses => res.json(expenses))
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

function influx(req,res){
    Influx.findAll()
    .then(influxes => res.json(influxes))
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

let BudgetCreator = function(){
    this.getBudget = getBudget;
    this.expenses = expenses;
    this.influx = influx;
}


module.exports = new BudgetCreator()