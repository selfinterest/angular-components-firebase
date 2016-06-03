/**
 * Created by terrence_watson on 6/1/16.
 */

import angular from "angular";
let Firebase = require("firebase");
require("angularfire");

//At compile time, webpack define plugin substitutes the firebase URL set in configuration
let firebaseUrl = __FIREBASE_URL__;



class MessagesService {

    constructor($log, $firebaseObject, $firebaseArray){
        $log.info("Firebase URL is %s", firebaseUrl);
        this._ref = new Firebase(firebaseUrl);
        this.messages = $firebaseArray(this._ref);
    }

    getMessages(){
        return this.messages;
    }
    
    sendMessage(message){
        this.messages.$add(message)
    }


}

MessagesService.$inject = ["$log", "$firebaseObject", "$firebaseArray"];


let module = angular.module("tw.demoApp.components.messages.messagesService", ["firebase"]);

module.service("messagesService", MessagesService);

export default module;