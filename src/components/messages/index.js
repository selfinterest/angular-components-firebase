/**
 * Created by terrence_watson on 6/1/16.
 */
"use strict";

import angular from "angular";
require("angular-ui-router");

import messagesService from "./messagesService";
import messageList from "./message-list";
import messageForm from "./message-form";

class MessagesController {
    constructor(messagesService){
        this.messagesService = messagesService;

        this.messages = this.messagesService.getMessages();

        this.message = {
            name: null,
            text: null
        }
    }
}

MessagesController.$inject = ["messagesService"];

let routeConfig = function($stateProvider){
    $stateProvider
        .state("home.messages", {
            url: "messages",
            template: `<messages></messages>`
        })
};

routeConfig.$inject = ["$stateProvider"];

let module = angular.module("tw.demoApp.components.messages", ["ui.router", messagesService.name, messageList.name, messageForm.name]);

module.config(routeConfig);

module.component("messages", {
    controller: MessagesController,
    controllerAs: "vm",
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">Messages</div>
            <div class="panel-body">
                <message-list messages="vm.messages"></message-list>
            </div>
        </div>
        <message-form message="vm.message" submit="vm.messagesService.sendMessage(vm.message); vm.message.text = ''"></message-form>
        
        
    `
});




export {
    module as default,
    MessagesController as MessagesController
}
