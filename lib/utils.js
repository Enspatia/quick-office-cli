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
