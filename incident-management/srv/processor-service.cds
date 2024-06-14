using { sap.capire.incidents as my } from '../db/schema';

//comment for service creation
service ProcessorService { 
    entity Incidents as projection on my.Incidents;


    @readonly
    entity Customers as projection on my.Customers;
}
extend projection ProcessorService.Customers with {
  firstName || ' ' || lastName as name: String
}
annotate ProcessorService.Incidents with @odata.draft.enabled; 