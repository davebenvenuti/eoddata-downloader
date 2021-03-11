#!/usr/bin/env node
"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _dotenv = require("dotenv");

require("./cli");

(0, _dotenv.config)();