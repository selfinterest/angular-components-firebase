/**
 * Created by terrence_watson on 6/1/16.
 */

import angular from "angular";

let module = angular.module("tw.demoApp.components.messages.list", []);

module.component("messageList", {
    controllerAs: "vm",
    template: `
        <div ng-repeat="message in vm.messages" class="row">
            <div class="col-lg-12">
                <strong>{{message.name}}:</strong> {{message.text}}
            </div>
        </div>
    `,
    bindings: {
        "messages": "="
    }
});


export default module;