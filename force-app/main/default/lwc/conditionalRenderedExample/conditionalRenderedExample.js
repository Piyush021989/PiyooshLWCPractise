import { LightningElement,track } from 'lwc';
export default class ConditionalRenderedExample extends LightningElement {
    @track displayDiv =false;
    @track cityList=['Jaipur','Ballia','Lucknow','Mumbai','Thane'];

    showDivTag(event){
        this.displayDiv = event.target.checked;
    }

}