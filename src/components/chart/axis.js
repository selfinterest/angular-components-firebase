/**
 * Created by terrence_watson on 6/2/16.
 */

import angular from "angular";
import d3 from "d3";

let module = angular.module("mhe.chart.axis", []);

class MheChartAxisController {
    constructor(){

    }

    $onInit(){
        console.log(this.chart);
    }

}

module.directive("mheChartAxis", [function(){

    return {
        restrict: "AE",
        require: {
            chart: "^mheChart"
        },
        bindToController: {
            "label": "@",
            "orientation": "@"
        },
        controllerAs: "vm",
        controller: MheChartAxisController
    }
}]);
export default module;