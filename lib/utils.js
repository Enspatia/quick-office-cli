const fs = require('fs');

module.exports.readFile = (filePath) => {
  return fs.readFileSync(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      return data;
    } else {
      console.log(err);
    }
  });
};

/**
 *
 * @param filePath
 * @return {Buffer | string}
 */
module.exports.fileExits = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 *
 * @param str {String}
 * @param searchStr
 * @param replacement
 * @return {*|void|string}
 */
module.exports.replace = (str, searchStr, replacement) => {
  return str.replace(new RegExp(searchStr, 'gi'), replacement);
};



/**
 *
 * @param str
 * @param vargs
 * @return {*|void|string}
 */
module.exports.replaceAll = (str, vargs) => {};
