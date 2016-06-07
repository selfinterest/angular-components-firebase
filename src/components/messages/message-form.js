/**
 * Created by terrence_watson on 6/1/16.
 */


import angular from "angular";

let module = angular.module("tw.demoApp.components.messages.form", []);

module.component("messageForm", {
    bindings: {
      message: "=",
      submit: "&"
    },
    controllerAs: "vm",
    template: `
        <form class="form-horizontal">
          <div class="form-group">
            <label for="inputName" class="col-sm-1 control-label">Name</label>
            <div class="col-sm-11">
              <input type="text" class="form-control" id="inputName" placeholder="Name (8 chars max pls)" ng-model="vm.message.name">
            </div>
          </div>
          <div class="form-group">
            <label for="inputMessage" class="col-sm-1 control-label">Message</label>
            <div class="col-sm-11">
              <input type="text" class="form-control" id="inputMessage" placeholder="Message" ng-model="vm.message.text">
            </div>
          </div>
          <button type="submit" class="btn btn-default" ng-click="vm.submit()" ng-disabled="!vm.message.text || !vm.message.name || vm.message.name.length > 8">Send</button>
        </form>
    `
});

export default module;