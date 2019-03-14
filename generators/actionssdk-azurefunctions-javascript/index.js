const path = require('path');
const Base = require(path.join(__dirname, '../../utils/base'));

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this._copyFile(
      'actions-sdk.action.json',
      'action.json'
    );

    this.sourceRoot(path.join(__dirname, './templates'));

    this._copyFile(
      'host.json',
      'host.json'
    );
    this._copyFile(
      'local.settings.json',
      'local.settings.json'
    );
    this._copyFile(
      'proxies.json',
      'proxies.json'
    );
    this._copyFile(
      'gitignore',
      '.gitignore'
    );
    this._copyFile(
      'function.json',
      'fulfillment/function.json'
    );
    this._copyFile(
      'index.js',
      'fulfillment/index.js'
    );
    this._copyFile(
      'package.json',
      'fulfillment/package.json'
    );
    this._copyFile(
      'sample.dat',
      'fulfillment/sample.dat'
    );
  }

};
