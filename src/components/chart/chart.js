/**
 * Created by terrence_watson on 6/2/16.
 */

import angular from "angular";
import d3 from "d3";
require("./chart.scss");

class MheChartController {
    constructor($element, $window, $scope){

        this.$window = $window;
        this.$element = $($element);
        this.$scope = $scope;
        this.element = $element[0]; //unwrapped element for direct DOM access
        this.defaults = {
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        }
        

        this.scales = new Map();
        this.elements = [];

        this.components = [];

    }

    getChart(){
        return this.chart;
    }

    $onInit(){
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

        let my = this;
        this.$scope.$watchCollection(function(){ return my.data}, this.redraw.bind(this));

    }


    getScaleByComponentName(name){
        return this.scales.get(name);
    }

    registerComponent(component){

        this.components.push(component);
        //If a component has a scale, we register the scales in a separate collection so they can be retrieved later by name
        if(component.scale) {
            this.scales.set(component.name, {scale: component.scale, scaleType: component.scaleType});
        }
    }

    redraw(){

        if(!this.data) return;
        
        if(this.$element.width() === 0 || this.$element.height() === 0) return;

        //Update scales
        this.components.forEach(component => {
            if(component.updateScale) {
                component.updateScale(this.data);
            }
        });

        //Redraw
        this.components.forEach(component => {
            if(component.redraw) {
                component.redraw(this.data);
            }
        })
    }
    $postLink(){

    }
}


MheChartController.$inject = ["$element", "$window", "$scope"];

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
        controllerAs: "chart"
    }
}]);

export default module;