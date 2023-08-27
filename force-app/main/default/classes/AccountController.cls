public with Sharing class AccountController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId){
        return [
            SELECT Name, Title, Email, Phone
            FROM Contact
            WHERE AccountId = :accountId
            WITH SECURITY_ENFORCED
        ];
    }
    
}