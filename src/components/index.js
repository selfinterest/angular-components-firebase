/**
 * Created by terrence_watson on 5/31/16.
 */

"use strict";

import angular from "angular";
import Sidebar from "./sidebar";
import Visualizations from "./visualizations";
import Messages from "./messages";

let module = angular.module("tw.demoApp.components", [Sidebar.name, Visualizations.name, Messages.name]);

export default module;