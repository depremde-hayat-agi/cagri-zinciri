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
            var  cagri = factory.newResource('org.deha.cagri', 'Cagri', cagriData.cagriId);
            cagri.lattitude = cagriData.lattitude;
            cagri.longitude = cagriData.longitude;
            cagri.creator = cagriData.creator;
            cagri.owner = cagriData.owner;

            // 3 Emit the event FlightCreated
            var event = factory.newEvent('org.deha.cagri', 'CagriYaratildi');
            event.cagriId = cagriData.cagriId;
            event.lattitude = cagriData.lattitude;
            event.longitude = cagriData.longitude
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
            cagri.owner = cagriAtaData.owner;
            
            var  factory = getFactory();
            var event = factory.newEvent('org.deha.cagri', 'CagriAtandi');
            event.cagriId = cagriAtaData.cagriId;
            event.owner = cagriAtaData.owner;
            emit(event);

            return cagriRegistry.update(cagri)
           }).then(
             console.log('Testing2')
           )
       });
}