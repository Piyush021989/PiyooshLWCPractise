public with sharing class carSearchResultController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c>  getCars(string carTypeId){
        
        if(string.isEmpty(carTypeId)){
            return [SELECT Id,Name,Picture__c, Contact__r.Name,Geolocation__Latitude__s, Geolocation__Longitude__s
                    FROM Car__c
                    WHERE Available_For_Rent__c = true
                    WITH SECURITY_ENFORCED];
        }
        else{
            return [SELECT Id,Name,Picture__c, Contact__r.Name,Geolocation__Latitude__s, Geolocation__Longitude__s
                    FROM Car__c
                    WHERE Available_For_Rent__c = true
                    AND Car_Type__c = :carTypeId
                    WITH SECURITY_ENFORCED];
        }
    }
}