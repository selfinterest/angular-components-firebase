/**
 * Created by terrence_watson on 5/31/16.
 */

"use strict";

import angular from "angular";
require("angular-ui-router");


class SidebarController {
    constructor(){
        this.items = [
            {
                state: "home.home",
                label: "Home"
            },
            {
                state: "home.visualizations",
                label: "Visualizations"
            },
            {
                state: "home.messages",
                label: "Messages"
            }
        ]
    }
}

let module = angular.module("tw.demoApp.components.sidebar", ["ui.router"]);

module.component("sidebar", {
    controller: SidebarController,
    controllerAs: "sidebar",
    template:
    `<ul class="nav nav-pills nav-stacked">
          <li ng-repeat="item in sidebar.items" role="presentation" ui-sref-active-eq="active"><a ui-sref="{{item.state}}">{{item.label}}</a></li>
    </ul>
    `
});

export {
    module as default,
    SidebarController as SidebarController
}