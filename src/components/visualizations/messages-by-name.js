/**
 * Created by terrence_watson on 6/2/16.
 */


"use strict";

import angular from "angular";
import mheChart from "../chart";

class MessagesByNameController {
    constructor(){
       this.data = [
           {
               val: 50,
               name: "Jie"
           }
       ];
       this.options = {
           margin: {
               top: 20,
               bottom: 60,
               left: 60,
               right: 60
           }
       }

       //this.domain = [0, 100];
       //this.tickValues = [0, 25, 50, 75, 100];
    }

    $onInit(){
        //this.data = ["blah"];

    }
}

let module = angular.module("tw.demoApp.components.visualizations.messages-by-name", [mheChart.name]);

module.component("messagesByName", {
    bindings: {
        messages: "="
    },
    controllerAs: "vm",
    controller: MessagesByNameController,
    template: `
        <div mhe-chart data="vm.data" options="vm.options">
           
            <mhe-chart-axis name="name" label="Names" orientation="bottom"></mhe-chart-axis>
            <mhe-chart-axis name="val" label="Messages" orientation="left" tick-values="[0, 25, 50, 75, 100]" domain="[0, 100]" tick-format="tickFormat"></mhe-chart-axis>
        </div>
            
    `
})
export default module;