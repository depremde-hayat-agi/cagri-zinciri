'use strict';

const NetworkCardStoreManager = require('composer-common').NetworkCardStoreManager;

var walletType = { type: 'composer-wallet-filesystem' }
const cardStore = NetworkCardStoreManager.getCardStore( walletType );

// 3. Gets all the card
return cardStore.getAll().then(function(cardMap){
    // Print all card names
    console.log(cardMap.keys());

    // 4. Get the name of the first card & then retrieve it
    let firstCard = cardMap.keys().next().value
    // Get the firstCard - returns a promise so check .then()
    return cardStore.get(firstCard);

}).then(function(idCard){

    // get the user and business name
    console.log("Pulled First Card from file system: ", idCard.getUserName(),' @ ', idCard.getBusinessNetworkName())

    // get the connection profile
    console.log("Connection Profile Name: ",idCard.getConnectionProfile().name)
    
}).catch((error)=>{
    console.log(error)
});
