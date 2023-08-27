import { LightningElement, track, wire } from 'lwc';
import contactListController from '@salesforce/apex/contactListController.getContactList';
import getContactWithImperativecCall from '@salesforce/apex/contactListController.getContactList';

export default class ContactListCmp extends LightningElement {

    @track conList;
    @track conListImpCall;

    @wire(contactListController)
    contactList({data,error}){
        if(data){
           this.conList = data;
        }
        else if(error){
            console.log('Error   ' + error);
        }
    }

    getContactList(){
        getContactWithImperativecCall().then(response =>{
            console.log('Get the data===>' + JSON.stringify(response));
             this.conListImpCall = response;
        }).catch(error =>{
            console.log('Error while Calling Imperative Method ==>' + JSON.stringify(error));
        });
    }

}