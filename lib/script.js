var CHARS = '0123456789abcdef'.split('');
var FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
function uuid() {
  var c = CHARS, id = FORMAT, r;

  id[0] = c[(r = Math.random() * 0x100000000) & 0xf];
  id[1] = c[(r >>>= 4) & 0xf];
  id[2] = c[(r >>>= 4) & 0xf];
  id[3] = c[(r >>>= 4) & 0xf];
  id[4] = c[(r >>>= 4) & 0xf];
  id[5] = c[(r >>>= 4) & 0xf];
  id[6] = c[(r >>>= 4) & 0xf];
  id[7] = c[(r >>>= 4) & 0xf];

  id[9] = c[(r = Math.random() * 0x100000000) & 0xf];
  id[10] = c[(r >>>= 4) & 0xf];
  id[11] = c[(r >>>= 4) & 0xf];
  id[12] = c[(r >>>= 4) & 0xf];
  id[15] = c[(r >>>= 4) & 0xf];
  id[16] = c[(r >>>= 4) & 0xf];
  id[17] = c[(r >>>= 4) & 0xf];

  id[19] = c[(r = Math.random() * 0x100000000) & 0x3 | 0x8];
  id[20] = c[(r >>>= 4) & 0xf];
  id[21] = c[(r >>>= 4) & 0xf];
  id[22] = c[(r >>>= 4) & 0xf];
  id[24] = c[(r >>>= 4) & 0xf];
  id[25] = c[(r >>>= 4) & 0xf];
  id[26] = c[(r >>>= 4) & 0xf];
  id[27] = c[(r >>>= 4) & 0xf];

  id[28] = c[(r = Math.random() * 0x100000000) & 0xf];
  id[29] = c[(r >>>= 4) & 0xf];
  id[30] = c[(r >>>= 4) & 0xf];
  id[31] = c[(r >>>= 4) & 0xf];
  id[32] = c[(r >>>= 4) & 0xf];
  id[33] = c[(r >>>= 4) & 0xf];
  id[34] = c[(r >>>= 4) & 0xf];
  id[35] = c[(r >>>= 4) & 0xf];

  return id.join('');
}



/**
 * Create Cagri Transaction
 * @param {org.deha.cagri.CagriYarat} cagriData
 * @transaction
 */
function cagriYarat(cagriData){
     /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */

    // Get the Asset Registry

    return getAssetRegistry('org.deha.cagri.Cagri')
    
        .then(function(cagriRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();
            var cagriId = uuid()

            var  cagri = factory.newResource('org.deha.cagri', 'Cagri', cagriId);
            cagri.lattitude = cagriData.lattitude;
            cagri.longitude = cagriData.longitude;
            cagri.cagriType = cagriData.cagriType;

            cagri.creator = factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', cagriData.creator) ;
            cagri.owner = cagriData.owner === undefined ? factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', 'ATANMAMIS')  : factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', cagriData.owner) ;
            cagri.validator = cagriData.validator === undefined ? factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', 'ATANMAMIS') : factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', cagriData.validator);

            // 3 Emit the event FlightCreated
            var event = factory.newEvent('org.deha.cagri', 'CagriYaratildi');
            event.cagriId = cagriId;
            event.lattitude = cagriData.lattitude;
            event.longitude = cagriData.longitude;
            event.cagriType = cagriData.cagriType

            event.owner = cagri.owner;
            event.validator = cagri.validator;
            event.creator = cagri.creator;

            emit(event);

            // 4. Add to registry
            return cagriRegistry.add(cagri);
        }).then(
        console.log('Testing1')
        );
}

/**
 * Create Cagri Transaction
 * @param {org.deha.cagri.CagriAta} cagriAtaData
 * @transaction
 */
function CagriAta(cagriAtaData){
    /**
    * 1. Validate the schedule data
    * If the date is a past date then throw an error
    */

   // Get the Asset Registry
   return getAssetRegistry('org.deha.cagri.Cagri')
   
       .then(function(cagriRegistry){
           // Now add the Flight - global function getFactory() called
           cagriRegistry.get(cagriAtaData.cagriId).then(function(cagri) {
            cagri.owner = factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', cagriAtaData.owner) ;
            
            var  factory = getFactory();
            var event = factory.newEvent('org.deha.cagri', 'CagriAtandi');
            event.cagriId = cagriAtaData.cagriId;
            event.owner = factory.newRelationship('org.deha.participant', 'HayatZinciriParticipant', cagriAtaData.owner) ;
            emit(event);

            return cagriRegistry.update(cagri)
           }).then(
             console.log('Testing2')
           )
       });
}