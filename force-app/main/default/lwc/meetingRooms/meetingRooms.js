import { LightningElement } from 'lwc';
export default class MeetingRooms extends LightningElement {
   meetingRoomInfo = [
       {roomName:'A-01', roomCapacity:'12'},
       {roomName:'A-02', roomCapacity:'20'},
       {roomName:'B-01', roomCapacity:'10'},
       {roomName:'B-02', roomCapacity:'08'},
       {roomName:'C-01', roomCapacity:'05'},
       {roomName:'C-02', roomCapacity:'12'}
   ];
}