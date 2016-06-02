/**
 * Created by terrence_watson on 6/2/16.
 */


"use strict";

import angular from "angular";
import mheChart from "../chart";

class MessagesByNameController {
    constructor(){
       this.data = []; 
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
        <div mhe-chart data="vm.data">
            <mhe-chart-axis name="names" label="Names" orientation="bottom"></mhe-chart-axis>
            <mhe-chart-axis name="numMessages" label="Messages" orientation="left"></mhe-chart-axis>
        </div>
            
    `
})
export default module;