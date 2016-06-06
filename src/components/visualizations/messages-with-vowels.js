"use strict";

import angular from "angular";
import mheChart from "../chart";

let _ = require("lodash");

class MessagesWithVowelsController {
    constructor($scope){
        var vowels = ["A", "E", "I", "O", "U"];

        this.data = vowels.map( v => {
            return {vowel: v, count: 0}
        });

        //A memoized lookup function to make things fast
        this.findVowelIndex =  v => {
            return vowels.indexOf(v.toUpperCase());
        };

        this.$scope = $scope;
        this.vowels = /[AEIOU]/g;


        this.options = {
            margin: {
                top: 60,
                bottom: 80,
                left: 90,
                right: 60
            }
        }

    }

    getVowels(bigString){
        var m = bigString.match(this.vowels), vowelMap = {};

        if(m.length) {
            m.forEach( vowel => {
                //count em up
                if(!vowelMap[vowel]) vowelMap[vowel] = {vowel: vowel, count: 0};
                vowelMap[vowel].count++;
            })
        } else {
            return [];      //return empty set
        }
    }

    update(newMessages, oldMessages){

        oldMessages = oldMessages || [];

        //We only count values in new messages, then update the old values
        var messages = _.difference(newMessages, oldMessages), bigString = '';
        var vowelMap = {};

        messages.forEach( message => {
            var m = message.text.toUpperCase().match(this.vowels);
            if(m && m.length) {
                //Go through each vowel
                m.forEach( v => {
                    //Find the data item
                    var i = this.findVowelIndex(v);
                    if(i > -1) {
                        this.data[i].count++;
                    }

                })
            }
        });

    }

    $onInit(){
        this.update(this.messages, []);


    }

    $postLink(){
        this.$scope.$watchCollection(() => this.messages, this.update.bind(this));
    }
}

MessagesWithVowelsController.$inject = ["$scope"];

let module = angular.module("tw.demoApp.components.visualizations.messages-with-vowels", [mheChart.name]);



module.component("messagesWithVowels", {
   controller: MessagesWithVowelsController,
   controllerAs: "vm",
   bindings: {
       "messages": "="
   },
   template: `
    <div mhe-chart data="vm.data" options="vm.options" chart-title="Number of Vowels">
            <mhe-chart-axis name="vowel" label="Vowels" orientation="bottom" scale-type="ordinal"></mhe-chart-axis>
            <mhe-chart-axis name="count" label="Count" orientation="left" scale-type="linear" extent="true"></mhe-chart-axis>
            <mhe-chart-bars x="vowel" y="count"></mhe-chart-bars>
    </div>
   `
});

export default module;