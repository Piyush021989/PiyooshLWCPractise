public with sharing class CarSearchFormController {

@AuraEnabled(cacheable=true)
public static List<Car_Type__c> getCarTypes(){
    return [SELECT Id, Name From Car_Type__c
            WITH SECURITY_ENFORCED];  
}
}