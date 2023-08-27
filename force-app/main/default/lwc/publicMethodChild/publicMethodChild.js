import { LightningElement, track, api } from 'lwc';
export default class PublicMethodChild extends LightningElement {
    @track getvalue = ['Red'];

    getoptions = [
        { label: 'Blue Marker', value: 'Blue' },
        { label: 'Red Marker', value: 'Red' },
        { label: 'Black Marker', value: 'Black' },
        { label: 'Green Marker', value: 'Green' },
    ]

    // get getoptions() {
    //     return [
    //         { label: 'Blue Marker', value: 'Blue' },
    //         { label: 'Red Marker', value: 'Red'},
    //         { label: 'Black Marker', value: 'Back' },
    //         { label: 'Green Marker', value: 'Green' },
    //     ];
    // }

    @api
    selectCheckBox(checkboxValue) {
        console.log('checkboxValue  ' + checkboxValue);
        const selectedCheckbox = this.getoptions.find(checkbox => {
            return checkboxValue === checkbox.value;
        });
        console.log('selectedCheckbox  ' + selectedCheckbox);
        if (selectedCheckbox) {
            this.getvalue = selectedCheckbox.value;
            return "Successfully Checked";
        }
        return "No Chekcbox Found";

    }
}