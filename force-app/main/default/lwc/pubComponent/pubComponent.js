import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class PubComponent extends LightningElement {
    @wire (CurrentPageReference) pageRef;

    handleCallEventClick(event){
         var eventParam = {'firstName' : 'Piyush'};
         fireEvent(this.pageRef,'eventName',eventParam);   
    }
}