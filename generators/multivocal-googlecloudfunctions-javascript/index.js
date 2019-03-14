const path = require('path');
const Base = require(path.join(__dirname, '../../utils/base'));

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this._copyFile(
      'multivocal.google-cloud-functions.javascript.package.json',
      'package.json'
    );
    this._copyFile(
      'multivocal.google-cloud-functions.javascript.index.js',
      'index.js'
    );
  }

};
