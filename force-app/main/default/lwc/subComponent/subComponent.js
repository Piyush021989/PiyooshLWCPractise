import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListener } from 'c/pubsub';

export default class SubComponent extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track responseReceived;
    @track detailPresent = false;

    connectedCallback() {
        registerListener('eventName', this.handleCallback, this);
    }

    disconnectedCallback() {
        unregisterAllListener(this);
    }

    handleCallback(detail) {
        if (detail) {
            this.responseReceived = detail.firstName;
            this.detailPresent = true;
        }
    }
}