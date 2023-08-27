import { LightningElement, wire,api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class WireGetRecordProperty extends LightningElement {
 @api recordId;
 @wire (getRecord,{recordId : '$recordId', fields:[ACCOUNT_NAME_FIELD]})
 account;
}