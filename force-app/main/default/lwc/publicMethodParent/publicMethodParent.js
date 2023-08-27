import { LightningElement,track } from 'lwc';
export default class PublicMethodParent extends LightningElement {

    @track getvalue;

    handleSelectedMarkeup(){
        console.log('this.getvalue    ' + this.getvalue);
        const childComponent = this.template.querySelector('c-public-method-child');
        const returnMessage = childComponent.selectCheckBox(this.getvalue);
        console.log('returnMessage    ' + returnMessage);
    }

    onInputChangeHandler(event){
        this.getvalue = event.target.value;
    }

}