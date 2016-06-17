/**
 * Created by terrence_watson on 6/2/16.
 */


"use strict";

import angular from "angular";
import mheChart from "../chart";

class MessagesByNameController {
    constructor($scope){
        this.$scope = $scope;

        this.data = [];

       this.options = {
           margin: {
               top: 60,
               bottom: 80,
               left: 90,
               right: 60
           }
       }

        
    }

    update(newArray, oldArray){

        if(newArray.length){
            //compute data

            //Find total messages sent
            let total = newArray.length;
            //Find what percentage was from what person
            let people = {};
            newArray.forEach( item => {
                if(!people[item.name]) people[item.name] = 0;
                people[item.name]++;
            });

            let averages = {};
            Object.keys(people).forEach( person => {
               averages[person] = people[person] / newArray.length;
            });

            //Flip into expected data format
            let data = [];
            Object.keys(averages).forEach( person => {
                data.push({
                    name: person,
                    val: Math.round(averages[person] * 100)
                })
            })

            this.data = data;
            
        }
    }
    $onInit(){

    }

    $postLink(){

        this.$scope.$watchCollection(() => this.messages, this.update.bind(this));


    }
}

MessagesByNameController.$inject = ["$scope"];

let module = angular.module("tw.demoApp.components.visualizations.messages-by-name", [mheChart.name]);

module.component("messagesByName", {
    bindings: {
        messages: "="
    },
    controllerAs: "vm",
    controller: MessagesByNameController,
    template: `
        <div mhe-chart data="vm.data" options="vm.options" chart-title="Proportion of Messages By People">
            <mhe-chart-axis name="name" label="Names" orientation="bottom" scale-type="ordinal" tick-fit="stagger"></mhe-chart-axis>
            <mhe-chart-axis name="val" label="Messages" orientation="left" tick-values="[0, 25, 50, 75, 100]" domain="[0, 100]" tick-format="%"></mhe-chart-axis>
            <mhe-chart-bars x="name" y="val"></mhe-chart-bars>
        </div>
            
    `
})
export default module;