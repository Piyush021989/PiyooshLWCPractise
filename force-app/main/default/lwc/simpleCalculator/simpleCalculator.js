import { LightningElement, track } from 'lwc';
export default class SimpleCalculator extends LightningElement {
    @track currentResult;
    @track showPreviousValue = [];
    @track previousvalue = false;

    varFirstNumber;
    varSecondNumber;

    inputNumberHandler(event) {
        const getTheNumberFOrS = event.target.name;
        if (getTheNumberFOrS === "firstNumber") {
            this.varFirstNumber = event.target.value;
        } else if (getTheNumberFOrS === "secondNumber") {
            this.varSecondNumber = event.target.value;
        }
    }

    addHandler(){
        const fN = parseInt(this.varFirstNumber);
        const sN = parseInt(this.varSecondNumber);
        this.currentResult = `Sum of ${fN} + ${sN} is ${fN+sN}`;
        this.showPreviousValue.push(this.currentResult);
    }

     subHandler(){
        const fN = parseInt(this.varFirstNumber);
        const sN = parseInt(this.varSecondNumber);
        this.currentResult = `Substraction of ${fN} - ${sN} is ${fN-sN}`;
        this.showPreviousValue.push(this.currentResult);
    }

     multiplyHandler(){
        const fN = parseInt(this.varFirstNumber);
        const sN = parseInt(this.varSecondNumber);
        this.currentResult = `Multiply of ${fN} X ${sN} is ${fN*sN}`;
        this.showPreviousValue.push(this.currentResult);
    }

     divisionHandler(){
        const fN = parseInt(this.varFirstNumber);
        const sN = parseInt(this.varSecondNumber);
        this.currentResult = `Divison of ${fN} / ${sN} is ${fN/sN}`;
        this.showPreviousValue.push(this.currentResult);
    }

    showPreviousValueToggle(event){
        this.previousvalue = event.target.checked;
    }
}