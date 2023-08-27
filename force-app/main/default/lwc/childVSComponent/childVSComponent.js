import { LightningElement,api } from 'lwc';

export default class ChildVSComponent extends LightningElement {

    @api valueInChild = 'Value from Child Component';
}