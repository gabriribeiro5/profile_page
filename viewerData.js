class dataHandler {
    constructor() {
        this.serverURL = ""; // must be string
        this.accessRegistry = {"date": "", "time": "", "sessionId": "", "deviceId": "", "origin": ""};
        this.chosenButtonRegistry = {"date": "", "time": "", "sessionId": "", "deviceId": "", "choosenButton": ""};
    }

    // HTTP METHODS
    requestPost(data, destination) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", destination, true); // true = async post
        xhttp.send(data);
    }

    // METHODS FOR DATA COLLECTION 
    getDeviceId() {
        let deviceId = localStorage.getItem('DeviceId');
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem('DeviceId', deviceId);
        }
        return deviceId;
    }

    getSessionID() {
        let sessionId = "insert a method here to retrive sessionId";
        if (!sessionId) {
            // generate sessionId
        }
        return sessionId;
    }
    
    getVisitorOrigin() {
        let visitorOrigin = "insert a method here to retrive visitorOrigin";
        if (!visitorOrigin) {
            // generate visitorOrigin
        }
        return visitorOrigin;
    }

    setAccessRegistry() {
        this.accessRegistry.date = ""; // TODO
        this.accessRegistry.time = ""; // TODO
        this.accessRegistry.sessionId = getSessionID();
        this.accessRegistry.deviceId = getDeviceId();
        this.accessRegistry.origin = getVisitorOrigin();
    };

    setChosenButtonRegistry() {
        this.chosenButtonRegistry.date = ""; // TO DO
        this.chosenButtonRegistry.time = ""; // TO DO
        this.chosenButtonRegistry.sessionId = this.accessRegistry.sessionId;
        this.chosenButtonRegistry.deviceId = this.accessRegistry.deviceId;
        this.chosenButtonRegistry.choosenButton = "";
    };
    

    setRegistries() {
        setAccessRegistry();
        setChosenButtonRegistry(this.accessRegistry);
    };

    // SENDING DATA
    sendPrimaryAccessData() {
        setRegistries();
        primaryDataDestination = `${this.serverURL}/primaryAccessHistory.json`;
        requestPost(data = this.accessRegistry, destination = primaryDataDestination);
    }

    notifyChosenButton(chosenButton) {
        chosenButtonsDestination = `${this.serverURL}/sessionHistory.json`;
        requestPost(data = chosenButton, destination = chosenButtonsDestination);
    }
    
  }