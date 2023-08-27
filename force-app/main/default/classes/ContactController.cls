public with sharing class ContactController {

    @AuraEnabled(Cacheable=true)
    public static list<Contact> getContacts(){
        throw new AuraHandledException('Forced error');
        /* return [
SELECT FirstName,LastName,Email
FROM Contact
Order by Name
];*/
    }
}