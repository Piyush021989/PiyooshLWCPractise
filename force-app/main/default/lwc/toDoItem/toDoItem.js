import { LightningElement, api } from 'lwc';
import updateTodo from '@salesforce/apex/ToDoController.updateTodo';
import deleteTodo from '@salesforce/apex/ToDoController.deleteTodo';

export default class ToDoItem extends LightningElement {
    //@api is used for the public properties

    @api todoId;
    @api todoName;
    @api done = false;

    get containerClass() {
        return this.done ? "todo completed" : "todo upcoming";
    }

    get iconName() {
        return this.done ? "utility:check" : "utility:add";
    }

    completeTodoHandler() {

        console.log('Inside the completeTodoHandler  ' + this.todoId + '  ' + this.todoName);
        const todo = {
            todoId: this.todoId,
            todoName: this.todoName,
            done: !this.done
        }

        updateTodo({ payload: JSON.stringify(todo) }).then(updateResponse => {
            console.log('Todo Task has been completed');
            //Called the Custom Event so that when Any record updated and Deleted the TODOMANAGER 
            //component will get refreshed. In Other word, When Record updated/Deleted a communication
            //will be sent from the Child component to the Parent Component
            const updateEvent = new CustomEvent("update");
            this.dispatchEvent(updateEvent);
        }).catch(error => {
            console.log('Error at the time of the Task completion ' + JSON.stringify(error));
        });

    }

    deleteTodoHandler() {
        deleteTodo({ payloadId: this.todoId }).then(deleteResponse => {
            console.log('Todo Task has been deleted');
            //Called the Custom Event so that when Any record updated and Deleted the TODOMANAGER 
            //component will get refreshed. In Other word, When Record updated/Deleted a communication
            //will be sent from the Child component to the Parent Component
            const deleteEvent = new CustomEvent("delete");
            this.dispatchEvent(deleteEvent);
        }).catch(error => {
            console.log('Error at the time of Todo task deletion ' + error);
        });
    }
}