import { LightningElement ,api } from 'lwc';
import getRelatedContacts from '@salesforce/apex/AccountController.getRelatedContacts';

export default class CallApexImperative extends LightningElement {
    @api recordId;

    handleButtonClick(){
        getRelatedContacts({
            accountId : this.recordId
        })
         .then(contacts => {

         })
         .catch(error => {

         });
    }
}