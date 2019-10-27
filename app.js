'use strict'
//NPM
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const budgetCreator = require('./route/budgetCreator');
const walletMonitor = require('./route/walletMonitor');
const bookKeeper = require('./route/bookKeeper');

const app = express();

const port = 8989;
app.listen(port, ()=> {
    console.log(`Connected to Port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/stylesheets',express.static(path.join(__dirname,'./stylesheets')));
app.use('/js',express.static(path.join(__dirname,'./js')));
app.use('/views',express.static(path.join(__dirname,'./views')));
app.use('/images',express.static(path.join(__dirname,'./images')));

app.get('/expense',budgetCreator.expenses);
app.get('/influx',budgetCreator.influx);
app.get('/budget/:year/:month',budgetCreator.getBudget);

app.get('/transaction',bookKeeper.getTransaction);
app.get('/transaction/segmented',bookKeeper.getSegmentedTransaction);

app.get('/wallet',walletMonitor.getWallets);
app.get('/wallet/:id',walletMonitor.getWalletSummary);


app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});