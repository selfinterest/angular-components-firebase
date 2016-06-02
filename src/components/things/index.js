"use strict";

import angular from "angular";
require("angular-ui-router");

class ThingsController {
    constructor(){

    }
}


let routeConfig = function($stateProvider){
    $stateProvider
        .state("home.things", {
            url: "things",
            template: `<things></things>`
        })
};

routeConfig.$inject = ["$stateProvider"];


let module = angular.module("tw.demoApp.components.things", ["ui.router"]);

module.config(routeConfig);

module.component("things", {
    controller: ThingsController,
    controllerAs: "things",
    template: `<div>things</div>`
});


export {
    module as default,
    ThingsController as ThingsController
}
