const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class Base extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.sourceRoot(path.join(__dirname, '../templates'));
  }

  _copyFile(templatePath, destinationPath, options) {
    const _options = options || {};
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      _options
    );
  }

}
