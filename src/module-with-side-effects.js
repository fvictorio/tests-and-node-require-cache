global.value = 42

module.exports.inc = function inc() {
  global.value++;
}
