# Action Fulfillment Code Project for Google Assistant Generator

Action Fulfillment Code Project for Google Assistant Generator creates everything you need to get started with action development. You can choose the following implementations:

* Action Type: Actions SDK or Dialogflow.
* Cloud Service: Firebase Functions, Google Cloud Functions or Google AppEngine.
* Language: JavaScript, TypeScript or Java.

[![NPM Version](https://img.shields.io/npm/v/generator-action.svg)](https://www.npmjs.org/package/generator-action)

## Getting Started

```bash
# Install Yeoman
$ npm install -g yo

# Install generator-action
$ npm install -g generator-action

# Make a project directory
$ mkdir <PROJECT_DIRECTORY_NAME>; cd <PROJECT_DIRECTORY_NAME>

# Invoke the generator with yo command
$ yo action
```

## Generatable Projects

This generator can generate the following projects:

### Firebase Functions

You can generate a project with a fulfillment code deployed to Firebase Functions. Also, you can choose a language from the following:

* JavaScript
* TypeScript

Actually, the generated code depends on the [Actions on Google Client Library for NodeJS](https://github.com/actions-on-google/actions-on-google-nodejs). A different code is generated dependning on your selection from Actions SDK or Dialogflow.

If Actions SDK is selected, `action.json` Action Package file is generated. It can be used to register actions with `gactions` command.

### Google Cloud Functions

You can generate a project with a fulfillment code deployed to Google Cloud Functions. Also, you can choose a language from the following:

* JavaScript
* TypeScript

Actually, the generated code depends on the [Actions on Google Client Library for NodeJS](https://github.com/actions-on-google/actions-on-google-nodejs). A different code is generated dependning on your selection from Actions SDK or Dialogflow.

If Actions SDK is selected, `action.json` Action Package file is generated. It can be used to register actions with `gactions` command.

### Google AppEngine

You can generate a project with a fulfillment code deployed to Google AppEngine. In this case, Java language is applied.

Actually, the generated code depends on the [Actions on Google Client Library for Java](https://github.com/actions-on-google/actions-on-google-java). And, JAva Servlet class is created to handle requests. Also, Gradle build file is generated as the build system.

If Actions SDK is selected, `action.json` Action Package file is generated. It can be used to register actions with `gactions` command.

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `skip-welcome-message`

  Skips the welcome message.

* `skip-install-message`

  Skips the message after the installation of dependencies.
