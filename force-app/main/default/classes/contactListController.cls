public without sharing class contactListController {

    @AuraEnabled(cacheable=true)
    public static list<Contact> getContactList(){
       List<Contact> conList = [SELECT Id, Name,LastName FROM CONTACT LIMIT 5];
       return conList;
    }
   
}