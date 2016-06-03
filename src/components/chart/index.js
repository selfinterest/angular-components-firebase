/**
 * Created by terrence_watson on 6/2/16.
 */

"use strict";

import angular from "angular";
import chart from "./chart";
import axis from "./axis";
import bars from "./bars";

let module = angular.module("mhe.chart", [chart.name, axis.name, bars.name]);

export default module;