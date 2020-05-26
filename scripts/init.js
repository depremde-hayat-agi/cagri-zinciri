
const participantNamespace = 'org.deha.participant';
const participantType = 'HayatZinciriParticipant';

// 1. Connect
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the aircraft AssetRegistry
    return bnUtil.connection.getParticipantRegistry(participantNamespace + '.' + participantType).then((registry)=>{
        addParticipants(registry);
    })
}


function    addParticipants(registry){
    // 3. This Array will hold the instances of aircraft resource

    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();

    let afad = factory.newResource(participantNamespace, participantType, 'AFAD');
    let ibb = factory.newResource(participantNamespace, participantType, 'IBB');
    let akut = factory.newResource(participantNamespace, participantType, 'AKUT');
    //participants.push(AFAD);

    // 4. Add the Aircraft resource to the registry
    registry.addAll([afad, ibb, akut]).then(()=>{
        console.log('afad, ibb, akut resources added successfully!!!');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
    
}