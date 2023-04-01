const assert = require("assert");
require("../../src/module-with-side-effects");

assert(global.value === 43);
