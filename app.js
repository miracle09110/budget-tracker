'use strict'
//NPM
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.get('/expense',budgetCreator.expenses);
app.get('/influx',budgetCreator.influx);
app.get('/budget/:year/:month',budgetCreator.getBudget);

app.get('/transaction',bookKeeper.getTransaction);
app.get('/transaction/segmented',bookKeeper.getSegmentedTransaction);

app.get('/wallet',walletMonitor.getWallets);
app.get('/wallet/:id',walletMonitor.getWalletSummary);
