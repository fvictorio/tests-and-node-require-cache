const { fork } = require("child_process");
const path = require("path");
const fs = require("fs");

async function runFixture(pathToFixture) {
  const child = fork(pathToFixture, {
    stdio: "pipe"
  });

  let stderr = "";

  child.stderr.on("data", chunk => {
    stderr += chunk.toString();
  });

  return new Promise((resolve, reject) => {
    child.on("exit", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Test failed\n" + stderr));
      }
    });
  });
}

describe("run all fixtures", function () {
  const fixtures = fs
    .readdirSync(path.join(__dirname, "fixtures"))
    .filter(x => !x.startsWith("."));

  for (const fixture of fixtures) {
    it(`run fixture "${fixture}"`, async function () {
      const pathToFixture = path.join(__dirname, "fixtures", fixture);
      await runFixture(pathToFixture)
    });
  }
});
