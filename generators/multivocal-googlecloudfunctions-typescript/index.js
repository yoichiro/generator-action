const Generator = require('yeoman-generator');
const Base = require('../../utils/base');

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this._copyFile(
      'multivocal.google-cloud-functions.typescript.package.json',
      'package.json'
    );
    this._copyFile(
      'typescript.tsconfig.json',
      'tsconfig.json'
    );
    this._copyFile(
      'typescript.tslint.json',
      'tslint.json'
    );
    this._copyFile(
      'multivocal.google-cloud-functions.typescript.index.ts',
      'src/index.ts'
    );
  }

};
