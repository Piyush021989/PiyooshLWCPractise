import { LightningElement, track, api } from 'lwc';
import page1 from './lifecycleHook1.html';
import page2 from './lifecycleHook2.html';

export default class LifecycleHook extends LightningElement {


    sampleList = [];
    @api page = 'temp1';

    /*Constructor method are called when component Instance are created.
      Do not assign any property in Constructor because they are not ready at this point.
      The flow of Constructor is flows from parent to child (init flows from child to parent),
      so do not try to access child element. 
      It means if there are child components in LWC, 
      then first parent constructor will be called, followed by child constructor.
    */
    constructor() {
        super();
        console.log('Inside the Constructor');
    }

    /*This method fires when component inserted into DOM, 
       and it can fire more than one time.
       This hook fires from parent to child. 
       You can’t access child elements in the component body because they don’t exist yet.
       Parent element can be modified in this hook
     */

    connectedCallback() {
        this.sampleList.push('Hello from the connectedCallback');
        console.log('Connected Callback');
        console.log('List Data  ' + this.sampleList);

    }

    /*
    It fires when a component removed from DOM.
    This hook flows from parent to child.This hook is similar to unrender() method of aura component.
    When this component removed form DOM, it will fire disconnectedCallback and clear array.
     */
    disconnectedCallback() {
        this.sampleList = [];
        console.log('Inside the Disconnected Callback');
    }

    changeTemplate() {
        if(this.page=='temp1')
            this.page='temp2';
        else this.page='temp1';
    }

    /*
    This method is used for conditional renderingThis function gets invoked after connectedCallback() 
    and must return a valid HTML template
    */
    render() {
        if(this.page=='temp1')
            return page1;
        else return page2;
      }
}