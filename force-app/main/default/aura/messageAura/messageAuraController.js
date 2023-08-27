({
    sendHandler: function (component, event, helper) {
        const inputElement = component.find("inputBox");
        if (inputElement) {
            const msg = inputElement.get("v.value");

            const messagesVar = component.get("v.messages");
            messagesVar.push({
                id: messagesVar.length,
                value: msg,
                from: "AURA"
            });

            component.set("v.messages", messagesVar);

            //publish Messge using the Messaging Channel
            const msgPayload = {
                fieldNameInMessagingChannel: msg,
                from: "AURA"
            };

            const msgChannel = component.find("messageChannel");
            msgChannel.publish(msgPayload);

            inputElement.set("v.value","");
        }
    },

    messageHandler: function (component, event, helper) {

        if (event &&
            event.getParam("fieldNameInMessagingChannel") &&
            event.getParam("from") !== "AURA") {
            const msg = event.getParam("fieldNameInMessagingChannel");
            console.log('Message from Messaging Channel---' + msg);
            const messagesVar = component.get("v.messages");
            messagesVar.push({
                id: messagesVar.length,
                value: msg,
                from: "LWC"
            });
            console.log('Message from Messaging Channel---' + JSON.stringify(messagesVar));
            component.set("v.messages", messagesVar);
        }
    }
})