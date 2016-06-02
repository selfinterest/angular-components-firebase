/**
 * Created by terrence_watson on 5/31/16.
 */


/*
    Load library dependencies
 */

require("../node_modules/bootstrap/dist/css/bootstrap.css");
import angular from "angular";
require("angular-ui-router");


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
                        <div class="col-lg-2">
                            <sidebar></sidebar>
                        </div>
                        <div class="col-lg-10">
                            <!-- main content -->
                            <ui-view></ui-view>
                        </div>
                    </div>
                </div>
            `
        })
        .state("home.home", {
            url: "",
            template: `
                <div>Home</div>
            `
        })

};

routeConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

angular.module("tw.demoApp", ["ui.router", Components.name])
    .config(routeConfig)
;


