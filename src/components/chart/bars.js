/**
 * Created by terrence_watson on 6/3/16.
 */

"use strict";

import angular from "angular";
import d3 from "d3";

class MheBarsController{
    constructor(){
        
    }

    $onInit(){
        //Get the relevant scales
        this.xScale = this.chart.getScaleByComponentName(this.x);
        this.yScale = this.chart.getScaleByComponentName(this.y);


        this.chart.registerComponent(this);
    }

    redraw(data){
        if(!data || !data.length) return;

  
        console.log(data);
        
        this.barElements = this.barElements || this.chart.getChart().append("g").attr("class", "bars");
        var barWidth;
        if(this.xScale.scaleType === "ordinal") {
            barWidth = this.xScale.scale.rangeBand();
        } else {
            barWidth = this.innerChartWidth / data.length
        }

        let bars = this.barElements.selectAll("rect.bar").data(data);

        bars.exit().transition().duration(500)
            .attr("y", () => this.chart.innerChartHeight)
            .attr("height", 0)
            .remove()
        ;


        bars.transition().duration(500)
            .attr("x", d => this.xScale.scale(d[this.x]))    //this sets the scale based on the value of the property given by x
            .attr("y", d => this.yScale.scale(d[this.y]))
            .attr("height", d =>  {
                return this.chart.innerChartHeight - this.yScale.scale(d[this.y])
            })
            .attr("width", barWidth)
        ;

        bars.enter()
            .append("rect")
            .attr("class", (d, i) => `bar bar-${i}`)
            .attr("x", d => this.xScale.scale(d[this.x]))       //TODO: fix this up for the case where we are not using an ordinal scale for the x axis
            .attr("width", barWidth)
            .attr("y", this.chart.innerChartHeight)
            .attr("height", 0)
            .transition().duration(500)
            .attr("y", d => this.yScale.scale(d[this.y]))
            .attr("height", d => this.chart.innerChartHeight - this.yScale.scale(d[this.y]))
        ;
    }
}



var module = angular.module("mhe.chart.bars", []);

module.directive("mheChartBars", [function(){
    return {
        restrict: "AE",
        require: {
            chart: "^mheChart"
        },
        bindToController: true,
        controller: MheBarsController,
        controllerAs: "bars",
        scope: {
            x: "@",
            y: "@"
        }
    }
}]);

export default module;