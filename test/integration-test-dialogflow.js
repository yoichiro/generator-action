'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('generators:app', () => {

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
          'firebase.json',
          '.firebaserc'
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
          'firebase.json',
          '.firebaserc'
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

  it('Dialogflow, Azure Functions, JavaScript', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
        'cloudService': 'Azure Functions'
      })
      .then(() => {
        assert.file([
          'host.json',
          'local.settings.json',
          'proxies.json',
          '.gitignore',
          'fulfillment/index.js',
          'fulfillment/package.json',
          'fulfillment/sample.dat',
          'fulfillment/function.json'
        ]);
      });
  });

  it('Dialogflow, Azure Webapps, Maven', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
        'cloudService': 'Azure Web Apps',
        'language': 'Maven',
        'packageName': 'package1.name1'
      })
      .then(() => {
        assert.file([
          'pom.xml',
          'src/main/java/package1/name1/FulfillmentApp.java',
          'src/main/java/package1/name1/FulfillmentServlet.java'
        ]);
      });
  });

  it('Dialogflow, Azure Webapps, Gradle', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'actionType': 'Dialogflow',
        'cloudService': 'Azure Web Apps',
        'language': 'Gradle',
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
          'src/main/java/package1/name1/FulfillmentServlet.java'
        ]);
      });
  });

});
