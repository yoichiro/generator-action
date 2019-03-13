'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generators:app', () => {

  it('Sample, Codelab Level1', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Sample',
        'sampleType': 'CodelabLevel1'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'functions/.eslintrc.json',
          'firebase.json',
          'codelab-level-one.zip'
        ]);
      });
  });

});
