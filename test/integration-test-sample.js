'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generators:app', () => {

  it('Sample, Codelab Level 1', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Sample',
        'sampleType': 'CodelabLevel1',
        'actionProjectId': 'actionProjectId1'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'functions/.eslintrc.json',
          'firebase.json',
          'codelab-level-one.zip',
          '.firebaserc'
        ]);
      });
  });

  it('Sample, Codelab Level 2', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Sample',
        'sampleType': 'CodelabLevel2',
        'actionProjectId': 'actionProjectId1'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'functions/.eslintrc.json',
          'firebase.json',
          'codelab-level-two.zip',
          '.firebaserc'
        ]);
      });
  });

  it('Sample, Codelab Level 3', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Sample',
        'sampleType': 'CodelabLevel3',
        'actionProjectId': 'actionProjectId1'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'functions/.eslintrc.json',
          'firebase.json',
          'codelab-level-three.zip',
          '.firebaserc'
        ]);
      });
  });

});
