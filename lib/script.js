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
    var timeNow = new Date().getTime();
    var schedTime = new Date(cagriData.schedule).getTime();
    if(schedTime < timeNow){
        throw new Error("Scheduled time cannot be in the past!!!");
    }

    // Get the Asset Registry

    return getAssetRegistry('org.deha.cagri.Cagri')
    
        .then(function(cagriRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();
            var  cagri = factory.newResource('org.deha.cagri', 'Cagri', cagriData.cagriId);
            cagri.creator = cagriData.creator;
            cagri.owner = cagriData.owner;

            // 3 Emit the event FlightCreated
            var event = factory.newEvent('org.deha.cagri', 'CagriYaratildi');
            event.cagriId = cagriData.cagriId;
            emit(event);

            // 4. Add to registry
            return cagriRegistry.add(cagri);
        });
}