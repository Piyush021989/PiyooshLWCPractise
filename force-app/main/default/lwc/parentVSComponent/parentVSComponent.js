import { LightningElement,track } from 'lwc';

export default class ParentVSComponent extends LightningElement {
    @track valueInParent = 'Value from Parent Component';
    
}