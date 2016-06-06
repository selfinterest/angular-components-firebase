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
        this.findVowelIndex = _.memoize( v => {
            return vowels.indexOf(v.toUpperCase());
        });

        this.$scope = $scope;
        this.vowels = /[AEIOU]/g;


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
            var m = message.text.match(this.vowels);
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

//        console.log(this.data);

//        debugger;

        return;
        //Find the difference between the two arrays

        //Concatenate message text into one big string
        //var bigString = "", vowelMap = {};

        messages.forEach( message => bigString += message.text.toLowerCase());

        var vowels = this.getVowels(bigString);
        /*this.vowels.forEach( vowel => {
           var found = bigString.indexOf(vowel);
            if(found > -1) {
                if(!vowelMap[vowel]) vowelMap[vowel] = { vowel: vowel, count: 0};

                vowelMap[vowel].count++;
            }
        });*/

        /*for(var i = 0; i < bigString.length; i++){
            var c = bigString.charAt(i);
            var whichVowel = this.vowels.indexOf(c), vowel;
            if(whichVowel > -1){
                vowel = this.vowels[whichVowel];
                if(typeof vowelMap[vowel] === "undefined") vowelMap[vowel] = 0;
                vowelMap[vowel]++;
            }
        }*/

        //Spin into an array of objects at the end
        /*var data = [];
        Object.keys(vowelMap).forEach(vowel => {
            data.push({
                vowel: vowel,
                count: vowelMap[vowel]
            })
        });

        this.data = data;*/
        this.data = _.values(vowelMap);
        console.log(this.data);



    }

    $onInit(){



    }

    $postLink(){
        this.$scope.$watchCollection(() => this.messages, this.update.bind(this));
    }
}

MessagesWithVowelsController.$inject = ["$scope"];

let module = angular.module("tw.demoApp.components.visualizations.messages-with-vowels", [mheChart.name]);



module.component("messagesWithVowels", {
   controller: MessagesWithVowelsController,
   controllerAs: "messagesWithVowels",
   bindings: {
       "messages": "="
   }
});

export default module;