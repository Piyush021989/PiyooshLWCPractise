import { LightningElement, track, wire } from 'lwc';
import messageDemo from "@salesforce/messageChannel/messageDemo__c";
import {
    MessageContext,
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE
} from 'lightning/messageService';

export default class MessageLWC extends LightningElement {
    @track messages = [];
    @wire(MessageContext) msgContext;

    subscription = null;

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(this.msgContext, messageDemo, (msgListner) => {
                this.messageHandlerMethod(msgListner);
            });

        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    sendHandler() {
        const inputElement = this.template.querySelector("lightning-input");
        if (inputElement) {
            const msg = inputElement.value;
            this.messages.push({
                id: this.messages.length,
                value: msg,
                from: "LWC"
            })
            //publish Messge
            const msgPayload = {
                fieldNameInMessagingChannel: msg,
                from:"LWC"
            };
            publish(this.msgContext, messageDemo, msgPayload);
            inputElement.value = "";
        }
    }

    messageHandlerMethod(msgInput) {
        console.log('msgInput    ' + JSON.stringify(msgInput));
        if (msgInput && msgInput.from !== "LWC") {
            this.messages.push({
                id: this.messages.length,
                value: msgInput.fieldNameInMessagingChannel,
                from: msgInput.from
            });
        }
    }

}