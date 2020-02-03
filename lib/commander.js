const exec = require ('child_process').exec;

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Promise<{{ stdout: String, stderr: String }}>}
 */
function sh(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          stdout,
          stderr
        });
      }
    });
  });
}

module.exports = sh;
