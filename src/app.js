/**
 * Created by terrence_watson on 5/31/16.
 */


/*
    Load library dependencies
 */

require("../node_modules/bootstrap/dist/css/bootstrap.css");
//Before loading Angular, we need to load and assign jQuery to the window so that Angular will detect and use it.
window.jQuery = window.$ = require("jquery");

import angular from "angular";
require("angular-ui-router");
require("./styles.scss");


/* Main application module */

import Components from './components';


let routeConfig = ($urlRouterProvider, $stateProvider) => {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            abstract: true,
            url: "/",
            template: `
                <div class="container">
                    <div class="row">
                        <div class="col-md-2">
                            <sidebar></sidebar>
                        </div>
                        <div class="col-md-10">
                            <!-- main content -->
                            <ui-view></ui-view>
                        </div>
                    </div>
                </div>
            `
        })
        .state("home.home", {
            url: "",
            controller: ["messagesService", "$scope", function(messagesService, $scope){
                $scope.messages = messagesService.getMessages();
                $scope.messagesService = messagesService;
                $scope.message = {};
            }],
            template: `
                <div class="row home">
                    <div class="col-sm-4 message-list">
                        <div class="scrollable-container">
                            <message-list messages="messages"></message-list>
                        </div>
                                       
                    </div>
                    <div class="col-sm-8 messages-by-name">
                        <messages-by-name messages="messages"></messages-by-name>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <message-form message="message" submit="messagesService.sendMessage(message); message.text = ''"></message-form>
                    </div>
                    
                </div>
            `
        })

};

routeConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

angular.module("tw.demoApp", ["ui.router", Components.name])
    .config(routeConfig)
;


