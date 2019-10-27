'use strict'

const {Wallet, Transaction} = require('../sequelize');


function getWallets(req,res){
    Wallet.findAll()
    .then(wallets => res.json(wallets))
    .catch((err) => {res.sendStatus(500)});
}

function getWalletSummary(req, res){
    const walletId = req.params.id
    const responseBody = {}
    Wallet.findOne({
      where :{
          id : walletId
      },
      include: [Transaction]
    }).then(wallet => {
        res.json(wallet);
    });
    
}

let WalletCollector = function(){
    this.getWallets = getWallets
    this.getWalletSummary = getWalletSummary
}


module.exports = new WalletCollector()