import { LightningElement, api, wire, track } from 'lwc';
import getCars from '@salesforce/apex/carSearchResultController.getCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {
    // This component will received the "carSearchId" from the Parent compopnent from "carSearchForm"
    //api decorator is used for the Public property

    @api carTypeId;

    @track cars;
    @track selectedCarId;

    @wire(getCars, {carTypeId : '$carTypeId'})
    wiredCars({data, error}){
        if(data){
            this.cars = data;
        } else if(error){
            this.showToast('ERROR', error.body.message, 'error');
        }
    }

    carSelectedHadler(event){
        const carId = event.detail;
        this.selectedCarId = carId;
    }


    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    get carsFound(){
        if(this.cars){
            return true;
        }
        return false;
    }


}