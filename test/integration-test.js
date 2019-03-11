'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generators:app', () => {

  it('Actions SDK, Firebase Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Actions SDK',
        'cloudService': 'Firebase Functions',
        'language': 'JavaScript',
        'actionProjectId': 'actionProjectId1' 
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'action.json',
          'function.json'
        ]);
      });
  });

  it('Actions SDK, Firebase Functions, TypeScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Actions SDK',
        'cloudService': 'Firebase Functions',
        'language': 'TypeScript',
        'actionProjectId': 'actionProjectId1' 
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/src/index.ts',
          'functions/tsconfig.json',
          'functions/tslint.json',
          'action.json',
          'function.json'
        ]);
      });
  });

  it('Actions SDK, Google Cloud Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Actions SDK',
        'cloudService': 'Google Cloud Functions',
        'language': 'JavaScript',
        'actionProjectId': 'actionProjectId1' 
      })
      .then(() => {
        assert.file([
          'package.json',
          'index.js',
          'action.json'
        ]);
      });
  });

  it('Actions SDK, Google Cloud Functions, TypeScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Actions SDK',
        'cloudService': 'Google Cloud Functions',
        'language': 'TypeScript',
        'actionProjectId': 'actionProjectId1' 
      })
      .then(() => {
        assert.file([
          'package.json',
          'src/index.ts',
          'tsconfig.json',
          'tslint.json',
          'action.json'
        ]);
      });
  });

  it('Dialogflow, Firebase Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
        'cloudService': 'Firebase Functions',
        'language': 'JavaScript'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/index.js',
          'function.json'
        ]);
      });
  });

  it('Dialogflow, Firebase Functions, TypeScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
        'cloudService': 'Firebase Functions',
        'language': 'TypeScript'
      })
      .then(() => {
        assert.file([
          'functions/package.json',
          'functions/src/index.ts',
          'functions/tsconfig.json',
          'functions/tslint.json',
          'function.json'
        ]);
      });
  });

  it('Dialogflow, Google Cloud Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
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

  it('Dialogflow, Google Cloud Functions, TypeScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
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

  it('Actions SDK, Google AppEngine, Java', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Actions SDK',
        'cloudService': 'Google AppEngine',
        'language': 'Java',
        'packageName': 'package1.name1' 
      })
      .then(() => {
        assert.file([
          'action.json',
          'gradlew',
          'gradlew.bat',
          'build.gradle',
          'gradle/wrapper/gradle-wrapper.properties',
          'gradle/wrapper/gradle-wrapper.jar',
          'src/main/java/package1/name1/FulfillmentApp.java',
          'src/main/java/package1/name1/FulfillmentServlet.java',
          'src/main/webapp/WEB-INF/appengine-web.xml'
        ]);
      });
  });

  it('Dialogflow, Google AppEngine, Java', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
        'cloudService': 'Google AppEngine',
        'language': 'Java',
        'packageName': 'package1.name1' 
      })
      .then(() => {
        assert.file([
          'gradlew',
          'gradlew.bat',
          'build.gradle',
          'gradle/wrapper/gradle-wrapper.properties',
          'gradle/wrapper/gradle-wrapper.jar',
          'src/main/java/package1/name1/FulfillmentApp.java',
          'src/main/java/package1/name1/FulfillmentServlet.java',
          'src/main/webapp/WEB-INF/appengine-web.xml'
        ]);
      });
  });

});
