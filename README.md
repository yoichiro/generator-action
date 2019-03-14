# Yeoman Action Generator for Google Assistant

Yeoman Action Generator for Google Assistant creates everything you need to get started with action development. You can choose the following implementations:

* Action Type: Actions SDK, Dialogflow or Multivocal.
* Cloud Service: Firebase Functions, Google Cloud Functions or Google AppEngine.
* Language: JavaScript, TypeScript or Java.

Also, you can create a complete code set for Actions on Google Codelab Level 1, 2 and 3.

[![NPM Version](https://img.shields.io/npm/v/generator-action.svg)](https://www.npmjs.org/package/generator-action)
[![CircleCI](https://circleci.com/gh/yoichiro/generator-action.svg?style=svg)](https://circleci.com/gh/yoichiro/generator-action)

## Prerequisite

You need to install the following:

* NodeJS 8 or higher.

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

If Actions SDK or Dialogflow is selected as Action Type, the generated code depends on the [Actions on Google Client Library for NodeJS](https://github.com/actions-on-google/actions-on-google-nodejs). A different code is generated dependning on your selection from Actions SDK or Dialogflow. On the other hand, if Multivocal is selected as Action Type, the generated code depends on the [Multivocal](https://github.com/afirstenberg/multivocal) library.

If Actions SDK is selected, `action.json` Action Package file is generated. It can be used to register actions with `gactions` command.

### Google Cloud Functions

You can generate a project with a fulfillment code deployed to Google Cloud Functions. Also, you can choose a language from the following:

* JavaScript
* TypeScript

If Actions SDK or Dialogflow is selected as Action Type, the generated code depends on the [Actions on Google Client Library for NodeJS](https://github.com/actions-on-google/actions-on-google-nodejs). A different code is generated dependning on your selection from Actions SDK or Dialogflow. On the other hand, if Multivocal is selected as Action Type, the generated code depends on the [Multivocal](https://github.com/afirstenberg/multivocal) library.

If Actions SDK is selected, `action.json` Action Package file is generated. It can be used to register actions with `gactions` command.

### Google AppEngine

You can generate a project with a fulfillment code deployed to Google AppEngine. In this case, Java language is applied.

Actually, the generated code depends on the [Actions on Google Client Library for Java](https://github.com/actions-on-google/actions-on-google-java). And, JAva Servlet class is created to handle requests. Also, Gradle build file is generated as the build system.

If Actions SDK is selected, `action.json` Action Package file is generated. It can be used to register actions with `gactions` command.

### Sample Code Set

You can generate a complete code set of Actions on Google Codelab Level 1, 2 and 3.

* [Actions on Google Codelab Level 1](https://codelabs.developers.google.com/codelabs/actions-1/)
* [Actions on Google Codelab Level 2](https://codelabs.developers.google.com/codelabs/actions-2/)
* [Actions on Google Codelab Level 3](https://codelabs.developers.google.com/codelabs/actions-3/)

Actually, these generated code set are the same as the code set you can download from [here](https://github.com/actions-on-google/codelabs-nodejs).

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `skip-welcome-message`

  Skips the welcome message.

* `skip-install-message`

  Skips the message after the installation of dependencies.
