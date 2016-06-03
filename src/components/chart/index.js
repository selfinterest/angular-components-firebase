/**
 * Created by terrence_watson on 6/2/16.
 */

"use strict";

import angular from "angular";
import chart from "./chart";
import axis from "./axis";

let module = angular.module("mhe.chart", [chart.name, axis.name]);

export default module;