const exec = require('child_process').exec;

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Promise<{{ stdout: String, stderr: String }}>}
 */

let sh = function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (!err) {
        resolve({
          stdout,
          stderr
        });
      } else {
        reject(err);
      }
    });
  });
};

/**
 *
 * @param text
 * @return {Promise<unknown>}
 */
let print = function (text) {
  return new Promise((resolve, reject) => {
    try {
      if (arguments.length > 1) {
        let i = 1;
        while (arguments[i]) {
          text += ' ' + arguments[i];
          i++
        }
      }
      console.log(text);
      resolve()
    } catch (e) {
      reject(e)
    }
  });
};

module.exports = {
  print : print,
  sh    : sh
};
