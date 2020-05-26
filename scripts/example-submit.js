// Constant values - change as per your needs
const transactionType = "CagriYarat";

// 1. Connect to airlinev7
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();

    // 4. Create an instance of transaction

    let relation = factory.newRelationship("org.deha.participant", "HayatZinciriParticipant", "AFAD");
    let transaction = factory.newTransaction("org.deha.cagri", "CagriYarat");

    transaction.setPropertyValue('creator', relation);
    transaction.setPropertyValue('cagriId', "TEST");
    
    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}



