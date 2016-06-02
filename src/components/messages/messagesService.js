/**
 * Created by terrence_watson on 6/1/16.
 */

import angular from "angular";
require("angular-resource");
let Firebase = require("firebase");
require("angularfire");

let Chance = require("chance");


class MessagesService {

    constructor($firebaseObject, $firebaseArray){
        this._ref = new Firebase('https://terrence.firebaseio.com/');
        this.messages = $firebaseArray(this._ref);
    }

    getMessages(){
        return this.messages;
    }
    
    sendMessage(message){
        this.messages.$add(message)
    }


}

MessagesService.$inject = ["$firebaseObject", "$firebaseArray"];


let module = angular.module("tw.demoApp.components.messages.messagesService", ["ngResource", "firebase"]);

module.service("messagesService", MessagesService);

export default module;