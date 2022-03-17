function getNameFromCommandLine() {
  // Write you code here, name should be taken as args in process.argv
  let name = process.argv[process.argv.length - 1];
  return name;
}

function getNameFromEnv() {
  return process.env.name;
  // Write your code here
}

function getNameFromReadLine() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Hello", (ans) => {
    return ans;
  });
  // Write your code here
}

module.exports = {
  getNameFromCommandLine,
  getNameFromEnv,
  getNameFromReadLine,
};
