import { LightningElement } from 'lwc';
import { showToastEvent }   from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends LightningElement {

    objectApiName = CONTACT_OBJECT;
         fields = [CONTACT_FIRSTNAME,CONTACT_LASTNAME,CONTACT_EMAIL];

         handleSuccess(event){
             const toastEvent = new showToastEvent({
                 title:"Contact Created",
                 message: "Record Id : " + event.detail.id,
                 variant:"success"
             });
             this.dispatchEvent(toastEvent);
         }

}