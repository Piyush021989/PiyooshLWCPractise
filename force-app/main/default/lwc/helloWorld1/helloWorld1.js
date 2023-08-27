import { LightningElement, track } from 'lwc';

export default class HelloWorld1 extends LightningElement {
    @track dynamicGreeting = 'World';

    greetingMethodInLWC(event) {
        this.dynamicGreeting = event.target.value;
    }
}