module.exports = {
  generatorMap: {
    'Actions SDK': {
      'Firebase Functions': {
        'TypeScript': '../actionssdk-firebasefunctions-typescript',
        'JavaScript': '../actionssdk-firebasefunctions-javascript'
      },
      'Google Cloud Functions': {
        'TypeScript': '../actionssdk-googlecloudfunctions-typescript',
        'JavaScript': '../actionssdk-googlecloudfunctions-javascript'
      },
      'Google AppEngine': '../actionssdk-googleappengine-java'
    },
    'Dialogflow': {
      'Firebase Functions': {
        'TypeScript': '../dialogflow-firebasefunctions-typescript',
        'JavaScript': '../dialogflow-firebasefunctions-javascript'
      },
      'Google Cloud Functions': {
        'TypeScript': '../dialogflow-googlecloudfunctions-typescript',
        'JavaScript': '../dialogflow-googlecloudfunctions-javascript'
      },
      'Google AppEngine': '../dialogflow-googleappengine-java'
    },
    'Multivocal': {
      'Firebase Functions': {
        'TypeScript': '../multivocal-firebasefunctions-typescript',
        'JavaScript': '../multivocal-firebasefunctions-javascript'
      },
      'Google Cloud Functions': {
        'TypeScript': '../multivocal-googlecloudfunctions-typescript',
        'JavaScript': '../multivocal-googlecloudfunctions-javascript'
      }
    },
    'Sample': {
      'CodelabLevel1': '../sample-codelablevel1',
      'CodelabLevel2': '../sample-codelablevel2'
    }
  },
  options: {
    'skip-welcome-message': {
      desc: 'Skips the welcome message',
      type: Boolean
    },
    'skip-install-message': {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    },
    'skip-instruction-message': {
      desc: 'Skips the instruction message',
      type: Boolean
    }
  },
  endMessages: {
    'Firebase Functions': [
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Firebsae project: `firebase use <YOUR_PROJECT_ID>`',
      '2) Execute: `cd functions`',
      '3) Execute to deploy: `npm run deploy` or `yarn deploy`'
    ],
    'Google Cloud Functions': [
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Google Cloud project: `gcloud config set project <YOUR_PROJECT_ID>`',
      '2) Execute to deploy: `npm run deploy` or `yarn deploy`'
    ],
    'Google AppEngine': [
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Google Cloud project: `gcloud config set project <YOUR_PROJECT_ID>`',
      '2) Execute to build: `gradlew war`',
      '3) Execute to deploy: `gradlew appengineDeploy`'
    ],
    'Actions SDK': [
      '',
      '[Registering Your Action Package]',
      'To register your action package to Actions on Google, do the following:',
      '1) Replace the <YOUR_FULFILLMENT_URL> with yours in action.json file.',
      '2) Execute: `gactions update --action_package action.json --project <YOUR_ACTION_PROJECT_ID>`'
    ],
    'CodelabLevel1': [
      '',
      '[Codelab Level 1]',
      'Open the Actions on Google Codelab Level 1 page from the URL below:',
      'https://codelabs.developers.google.com/codelabs/actions-1/'
    ],
    'CodelabLevel2': [
      '',
      '[Codelab Level 2]',
      'Open the Actions on Google Codelab Level 2 page from the URL below:',
      'https://codelabs.developers.google.com/codelabs/actions-2/'
    ]
  }
};
