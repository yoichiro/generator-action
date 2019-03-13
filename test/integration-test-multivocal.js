'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generators:app', () => {

  it('Multivocal, Firebase Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Multivocal',
        'cloudService': 'Firebase Functions',
        'language': 'JavaScript'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'firebase.json',
          '.firebaserc'
        ]);
      });
  });

  it('Multivocal, Firebase Functions, TypeScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Multivocal',
        'cloudService': 'Firebase Functions',
        'language': 'TypeScript'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/src/index.ts',
          'functions/tsconfig.json',
          'functions/tslint.json',
          'firebase.json',
          '.firebaserc'
        ]);
      });
  });

  it('Multivocal, Google Cloud Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Multivocal',
        'cloudService': 'Google Cloud Functions',
        'language': 'JavaScript'
      })
      .then(() => {
        assert.file([
          'package.json',
          'index.js'
        ]);
      });
  });

  it('Multivocal, Google Cloud Functions, TypeScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Multivocal',
        'cloudService': 'Google Cloud Functions',
        'language': 'TypeScript'
      })
      .then(() => {
        assert.file([
          'package.json',
          'src/index.ts',
          'tsconfig.json',
          'tslint.json'
        ]);
      });
  });

});
