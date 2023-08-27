import { LightningElement, track } from 'lwc';
import addTodo from '@salesforce/apex/ToDoController.addTodo';
import getCurrentTodos from '@salesforce/apex/ToDoController.getCurrentTodos';

export default class ToDoManager extends LightningElement {
    //Track Decorator are the Reactive Property. Now, all the Private and the
    //non-private property are the Reactive Property
    @track time;
    @track greeting;
    @track todos = [];

    // time = "11:11AM";
    // greeting = "Good Afternoon";

    connectedCallback() {
        this.getTime();

        // The setInterval() method repeteadly call a function or 
        // Execute a code snippet, with fixed time delay between each call
        // 1000*60  1000ms is 1 Sec and 1 Sec * 60 = 1 min

        setInterval(() => {
            this.getTime();
        }, 1000 * 60)

        //this.prepopulateTodos();
        this.fetchTodos();

    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidday(hour)}`;
        this.setGreeting(hour);
    }

    getHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getMidday(hour) {
        return hour >= 12 ? "PM" : "AM";
    }

    getDoubleDigit(digit) {
        return digit < 10 ? "0" + digit : digit;
    }

    setGreeting(hour) {
        if (hour < 12) {
            this.greeting = 'Good Morning';
        } else if (hour >= 12 && hour < 17) {
            this.greeting = 'Good Afternoon';
        } else {
            this.greeting = 'Good Evening';
        }

    }

    addTodoHandler() {
        const inputBox = this.template.querySelector("lightning-input");
        //this.todos.push(inputBox.value);

        const todo = {
            todoName: inputBox.value,
            done: false,
        };

        addTodo({ payload: JSON.stringify(todo) }).then(response => {
            console.log('Item Inserted successfully  ' + response);
            this.fetchTodos();
        }).catch(error => {
            console.log('Error at the time of Inserting Todo Item' + error);
        });

        //this.todos.push(todo);
        inputBox.value = "";
    }

    //get is the Reactive property
    get upcomingTask() {
        return this.todos && this.todos.length ? this.todos.filter(todo => !todo.done) : [];
    }

    get completedTask() {
        return this.todos && this.todos.length ? this.todos.filter(todo => todo.done) : [];
    }

    prepopulateTodos() {
        const todoList = [
            {
                todoId: 0,
                todoName: 'Piyoosh',
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 0,
                todoName: 'Piyush',
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 0,
                todoName: 'Piyoosh Pathak Piyush Pathak',
                done: true,
                todoDate: new Date()
            }
        ]
        this.todos = todoList;
    }

    fetchTodos() {
        console.log('Inside the FetchTodos Method');
        getCurrentTodos().then(result => {
            if (result) {
                console.log('Retrieved Todos from Server ' + result.length);
                this.todos = result;
            }
            else {
                console.log('No Record retrieve');
            }
        }).catch(error => {
            console.log('Error in fetch Todso ' + error);
        })
    }

    updateHandler() {
        this.fetchTodos();
    }

    deleteHandler() {
        this.fetchTodos();
    }
}