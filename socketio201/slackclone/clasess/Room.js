

class Room  {
    constructor(roomId, roomTitle, namespaceId,privateRoom = false) { 
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespaceId = namespaceId;
        this.privateRoom = privateRoom;
        this.history = []; // Array para almacenar el historial de mensajes
    }

    addMessage(messageObj) {
        this.history.push(messageObj);
    }

    clearHistory() {
        this.history = [];
    }
}


module.exports = {
    Room
}