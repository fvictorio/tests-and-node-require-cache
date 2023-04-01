const assert = require("assert");
const { inc } = require("../../src/module-with-side-effects");

assert(global.value === 42);
inc()
assert(global.value === 43);
