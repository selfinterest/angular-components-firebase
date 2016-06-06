"use strict";

import angular from "angular";
import messagesService from "../messages/messagesService";
import messagesByName from "./messages-by-name";
require("angular-ui-router");
require("./visualizations.scss");

class VisualizationsController {
    constructor(messagesService){
        this.messagesService = messagesService;
        this.messages = this.messagesService.getMessages();


    }
}

VisualizationsController.$inject = ["messagesService"];


let routeConfig = function($stateProvider){
    $stateProvider
        .state("home.visualizations", {
            url: "visualizations",
            template: `<visualizations></visualizations>`
        })
};

routeConfig.$inject = ["$stateProvider"];


let module = angular.module("tw.demoApp.components.visualizations", ["ui.router", "tw.demoApp.components.messages.messagesService", messagesByName.name]);

module.config(routeConfig);

module.component("visualizations", {
    controller: VisualizationsController,
    controllerAs: "vm",
    template: `
        <h1>Visualizations</h1>
        <div class="row">
            <div class="col-lg-12">
                <messages-by-name messages="vm.messages" class="visualizations messages-by-name">
                </messages-by-name>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <messages-with-vowels messages="vm.messages"></messages-with-vowels>
            </div>
        </div>
        
    `
});


export {
    module as default,
    VisualizationsController as VisualizationsController
}
