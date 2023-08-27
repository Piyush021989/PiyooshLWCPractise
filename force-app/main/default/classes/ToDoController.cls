public class ToDoController {
    
    @AuraEnabled
    public static string addTodo(string payload){
       ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);

       SObject todo = (SObject) type.forName('ToDo__c').newInstance();
       todo.put('Name',payloadObject.todoName);
       todo.put('Done__c',payloadObject.done);

       insert todo;

       return String.valueOf(todo.Id);
    }

    @AuraEnabled
    public static void updateTodo(string payload){

        System.debug('payload    ' + payload);
        
        ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);

        SObject todo = (SObject) Type.forName('ToDo__c').newInstance();
        todo.put('Id',payloadObject.todoId);
        todo.put('Name', payloadObject.todoName);
        todo.put('Done__c', payloadObject.done);

        update todo;
    }

    @AuraEnabled
    public static void deleteTodo(string payloadId){
        Sobject todo = (SObject) Type.forName('ToDo__c').newInstance();
        todo.put('Id', payloadId);

        delete todo;
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo> getAllTodos(){
       List<Sobject> sobj = Database.query(
           'SELECT Id, Name, Done__c,CreatedDate FROM ToDo__c WHERE CreatedDate = LAST_N_DAYS:7 ORDER BY CreatedDate DESC'
           );
       return todos(sobj);
    }

    @AuraEnabled
    public static List<ToDo> getCurrentTodos(){
       List<Sobject> sobj = Database.query(
           'SELECT Id, Name, Done__c,CreatedDate FROM ToDo__c WHERE CreatedDate = TODAY ORDER BY CreatedDate DESC'
           );
       return todos(sobj);
    }

    @AuraEnabled
    public static list<ToDo> todos(List<Sobject> sObjs){
        List<ToDo>  listOfToDo = new List<ToDo>();
        for(SObject  obj:sObjs){
            ToDo   todo = new ToDo();
            todo.todoId    = obj.Id;
            todo.todoName  = string.valueOf(obj.get('Name'));
            todo.done      = boolean.valueOf(obj.get('Done__c'));
            todo.todoDate  = Date.valueOf(obj.get('CreatedDate'));
            listOfToDo.add(todo);
        }
        return listOfToDo; 
    }


    public class ToDo {
        @AuraEnabled
        public string todoId;
        @AuraEnabled
        public string todoName;
        @AuraEnabled
        public boolean done;
        @AuraEnabled
        public date todoDate;
     }
}