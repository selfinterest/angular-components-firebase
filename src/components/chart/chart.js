/**
 * Created by terrence_watson on 6/2/16.
 */

import angular from "angular";
import d3 from "d3";
require("./chart.scss");

class MheChartController {
    constructor($element){

        this.$element = $($element);
        this.element = $element[0]; //unwrapped element for direct DOM access
        this.defaults = {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        }

    }

    getChart(){
        return this.chart;
    }

    $onInit(){
        console.log(this);
        this._options = angular.merge(this.defaults, this.options);
        this.margin = this._options.margin;


        this.innerChartWidth = this.$element.width() - this.margin.left - this.margin.right;
        this.innerChartHeight = this.$element.height() - this.margin.top - this.margin.bottom;

        this.chart = d3.select(this.element)
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${this.innerChartWidth + this.margin.left + this.margin.right} ${this.innerChartHeight + this.margin.top + this.margin.bottom}`)
            .classed("svg-content-responsive", true)
            .append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)

    }
}


MheChartController.$inject = ["$element"];

let module = angular.module("mhe.chart.chart", []);

module.directive("mheChart", [function(){
    return {
        restrict: "AE",
        bindToController: true,
        scope: {
            data: "=",
            options: "="
        },
        controller: MheChartController,
        controllerAs: "vm"
    }
}]);

export default module;