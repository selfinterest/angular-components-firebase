/**
 * Created by terrence_watson on 6/2/16.
 */

import angular from "angular";
import d3 from "d3";
import BaseComponent from "./base-component";

let module = angular.module("mhe.chart.axis", []);

class MheChartAxisController extends BaseComponent {
    constructor(){
        var defaults = {
            orientation: "bottom",
            ticks: 5,
            extent: false,
            scaleType: "linear"
        };

        super(defaults);
        
        
    }

    range() {
        if(this.orientation === "top" || this.orientation === "bottom") {
            if(this.reverse) {
                //TODO
            } else {
                return [0, this.chart.innerChartWidth]
            }

        } else {
            if(this.reverse){
                //TODO
            } else {

                return [this.chart.innerChartHeight, 0]
            }
         }
    }

    translation(){
        if(this.orientation === "bottom") {
            return `translate(0, ${this.chart.innerChartHeight})`
        } else if (this.orientation === "left") {
            return "translate(0, 0)"
        }
    }


    getAxis(){
        let axis = d3.svg.axis().scale(this.scale).orient(this.orientation);
        if(this.ticks) {
            axis.ticks(this.ticks)
        }

        if(this.tickValues) {
            axis.tickValues(this.tickValues);
        }

        if(this.tickSize) {
            let tickSize = this.tickSize.split(",");
            axis.innerTickSize(tickSize[0]);
            axis.outerTickSize(tickSize[1]);
        }


        if(this.tickFormat) {

            let format;
            //There are some special formats
            if(this.tickFormat === "%") {
                format = function(t) {
                    return t + "%"
                }
            } else {
                if(!angular.isFunction(this.tickFormat)){
                    format = d3.format(this.tickFormat);
                } else {
                    format = this.tickFormat;
                }
            }


            axis.tickFormat(format);
        }

        return axis;
    }

    positionLabel(label){
        if(this.orientation === "bottom") {
            //This produces a centered label
            label.attr("x", `${this.chart.innerChartWidth / 2}`)
                .attr("dy", `${this.chart.margin.bottom / 2}`)
                .attr("style", "text-anchor: middle;")
        } else if (this.orientation === "left"){
            label
                .attr("transform", "rotate(-90)")
                .attr("x", `${(-this.chart.innerChartHeight /2)}`)
                .attr("dy", `${(-this.chart.margin.left / 2)}`)
                //.attr("x", `${(this.chart.innerChartHeight / 2)}`)
                //.attr("dy", `${(this.chart.margin.left + 18)}`)

                .attr("style", "text-anchor: middle;")
        }
    }

    $onInit() {
        if (!this.scale) {
            this.scale = d3.scale[this.scaleType]();

        }

        this.axisElement = null;
        this.labelElement = null;

        this.chart.registerComponent(this);
    }

    //Called by the master chart controller in its post-linking phase
    redraw(data) {
        if(!data || !data.length) return;

        this.axisElement = this.axisElement || this.chart.getChart().append("g")
            .attr("class", `axis-${this.orientation} axis-${this.name}`)
            .attr("transform", this.translation())
        ;
        if (this.label) {
            this.labelElement = this.labelElement || this.axisElement.append("text").attr("class", "axis-label").text(this.label);
        }

        let axis = this.getAxis();

        if (this.labelElement) {
            this.positionLabel(this.labelElement.transition().duration(500))
        }

        this.axisElement.transition().duration(500)
            .attr("transform", this.translation())
            .call(axis)
    }

    setRange(){
        if(this.scaleType === "ordinal") {
            if(this.orientation === "top" || this.orientation === "bottom") {
                this.scale.rangeRoundBands([0, this.chart.innerChartWidth], .5);
            } else {
                this.scale.rangeRoundBands([0, this.chart.innerChartHeight], .5);
            }
        } else {
            if(this.orientation === "top" || this.orientation === "bottom") {
                if(this.reverse) {
                    //TODO
                } else {
                    return this.scale.range([0, this.chart.innerChartWidth])
                }

            } else {
                if(this.reverse){
                    //TODO
                } else {

                    return this.scale.range([this.chart.innerChartHeight, 0])
                }
            }
        }
    }
    updateScale(data) {
        if(!data || !data.length) return;

        this.setRange();


        let domainValues = this.domain;
        
        if(domainValues) {
            this.scale.domain(domainValues);
            
        } else {

            domainValues = (() => {
                let i, len, results;

                results = [];
                for (i = 0, len = data.length; i < len; i++) {
                    let datum = data[i];
                    results.push(datum[this.name]);
                }
                return results;
            })();

        }


        if(this.extent) {
            this.scale.domain(d3.extent(domainValues))
        } else if (this.scaleType === "linear") {

            this.scale.domain([0, d3.max(domainValues)])
        } else if (this.scaleType === "ordinal") {
            this.scale.domain(domainValues);

        }
    }

}

module.directive("mheChartAxis", [function(){

    return {
        restrict: "AE",
        require: {
            chart: "^mheChart"
        },
        bindToController: {
            "name": "@",
            "label": "@",
            "orientation": "@",
            "scaleType": "@",
            "scale": "<",        //user can pass in a pre-defined scale
            "tickFormat": "@",
            "domain": "<",
            "tickValues": "<"
        },
        controllerAs: "axis",
        controller: MheChartAxisController
    }
}]);
export default module;