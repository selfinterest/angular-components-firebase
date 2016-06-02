/**
 * Created by terrence_watson on 5/31/16.
 */

"use strict";

import angular from "angular";
import Sidebar from "./sidebar";
import Things from "./things";
import Messages from "./messages";

let module = angular.module("tw.demoApp.components", [Sidebar.name, Things.name, Messages.name]);

export default module;