import MailingPostalCode from '@salesforce/schema/Contact.MailingPostalCode';
import { LightningElement } from 'lwc';

export default class VaccineSlotFinder extends LightningElement {
    centers = [];
    dates   = [];

    connectedCallback(){
        console.log('vaccineSlotData in connectedCallback--' );
      //https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=110001&date=31-03-2021
        this.fetchVaccineSlot();
    }

    //"fetch" is the Asysnchronous API. Also "await" will be used in the Asysnchronous Method
    async fetchVaccineSlot(){
        const vaccineSlotResponse = await fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=277001&date=31-03-2021")
        const vaccineSlotData = await vaccineSlotResponse.json();
        console.log('vaccineSlotData --' + JSON.stringify(vaccineSlotData));
        console.log('vaccineSlotData Center --' + JSON.stringify(vaccineSlotData.centers));
        this.buildColumnsNRows(vaccineSlotData.centers);
    }

    buildColumnsNRows(data){
        console.log('Inside the buildColumnsNRows  ' + JSON.stringify(data));
        //Build Columns/Date
        const dates = new Map();
        dates.set("name",{label:"Center Name",fieldName:"cenName",type:"text"});


        //Build rows/Centers
        const centers = new Map();

        for(const center of data){
            console.log('IN For Loop center---' + JSON.stringify(center) );
            centers.set(center.center_id,{cenName:center.name});

            for(const session of center.sessions){
                console.log('IN For session---' +JSON.stringify(session));
                //destructuring syntax
                const {date,available_capacity,min_age_limit} = session;

                //add date as column in dates Map
                dates.set(date,{
                    label:date,
                    fieldName:date,
                    type:"text"
                });

                //add the column Value
                centers.get(center.center_id)[date] = `Available Capacity ${available_capacity}
                Min Age ${min_age_limit}`;
            }
        }

        this.dates = Array.from(dates.values());
        this.centers = Array.from(centers.value());

        console.log('Centers Length---' + this.centers.length);
        
    }

    get hideMessage(){
        return this.centers.length > 0;
    }


}