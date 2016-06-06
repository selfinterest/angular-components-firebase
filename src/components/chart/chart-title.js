/**
 * Created by terrence_watson on 6/4/16.
 */

import angular from "angular";
import d3 from "d3";
import BaseComponent from "./base-component";

class ChartTitleController extends BaseComponent {
    constructor($transclude){
        var defaults = {

        }
        super(defaults);

        this.$transclude = $transclude;
    }

    $onInit(){

    }
}

ChartTitleController.$inject = ["$transclude"];

let module = angular.module("mhe.chart.title", []);

module.directive("mheChartTitle", ["$interpolate", function($interpolate){
    return {
        restrict: "AE",
        scope: true,
        require: {
            chart: "^mheChart"
        },
        controller: ChartTitleController,
        controllerAs: "chartTitle",
        compile: function(tElem, tAttr){
            //Run interpolation against the content of the tag
            var interpolateFn = $interpolate(tElem.html());
            tElem.empty();  //remove the content to prevent automatic interpolation
            return function(scope, elem, attr, ctrls){
                console.log(arguments);
                var chart = ctrls.chart;
                console.log(ctrls);
                //Watch the interpolation function
                scope.$watch(interpolateFn, function(value){

                })
            }
        }
    }
}])
export default module;