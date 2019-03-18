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
      'Google AppEngine': '../actionssdk-googleappengine-java',
      'Azure Functions': '../actionssdk-azurefunctions-javascript',
      'Azure Web Apps': {
        'Maven': '../actionssdk-azurewebapps-maven',
        'Gradle': '../actionssdk-azurewebapps-gradle'
      }
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
      'Google AppEngine': '../dialogflow-googleappengine-java',
      'Azure Functions': '../dialogflow-azurefunctions-javascript',
      'Azure Web Apps': {
        'Maven': '../dialogflow-azurewebapps-maven',
        'Gradle': '../actionssdk-azurewebapps-gradle'
      }
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
      'CodelabLevel2': '../sample-codelablevel2',
      'CodelabLevel3': '../sample-codelablevel3'
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
      '2) Change the directory: `cd functions`',
      '3) Deploy: `npm run deploy` or `yarn deploy`'
    ],
    'Google Cloud Functions': [
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Google Cloud project: `gcloud config set project <YOUR_PROJECT_ID>`',
      '2) Deploy: `npm run deploy` or `yarn deploy`'
    ],
    'Google AppEngine': [
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Google Cloud project: `gcloud config set project <YOUR_PROJECT_ID>`',
      '2) Build: `gradlew war`',
      '3) Deploy: `gradlew appengineDeploy`'
    ],
    'Azure Functions': [
      '',
      '[Azure Functions]',
      'To deploy your fulfillment, do the following:',
      '1) Create a resource group: `az group create --name <RESOURCE_GROUP_NAME> --location <LOCATION_NAME>`',
      '2) Create a storage account: `az storae account create --name <STORAGE_ACCOUNT_NAME> --resource-group <RESOURCE_GROUP_NAME> --location <LOCATION_NAME> -sku Standard_LRS`',
      '3) Create a function app: `az functionapp create --resource-group <RESOURCE_GROUP_NAME> --consumption-plan-location <LOCATION_NAME> --name <FUNCTION_APP_NAME> --storage-account <STORAGE_ACCOUNT_NAME> --runtime node`',
      '4) Deploy: `func azure functionapp publish <FUNCTION_APP_NAME>`'
    ],
    'Azure Web Apps': {
      'Maven': [
        '',
        '[Azure Webapps]',
        'To deploy your fulfillment, do the following:',
        '1) Create a resource group: `az group create --name <RESOURCE_GROUP_NAME> --location <LOCATION_NAME>`',
        '2) Deploy: `mvn package azure-webapp:deploy`'
      ],
      'Gradle': [
        '',
        '[Azure Webapps]',
        'To deploy your fulfillment, do the following:',
        '1) Create a resource group: `az group create --name <RESOURCE_GROUP_NAME> --location <LOCATION_NAME>`',
        '2) Deploy: `gradle war azureWebappDeploy`'
      ]
    },
    'Actions SDK': [
      '',
      '[Registering Your Action Package]',
      'To register your action package to Actions on Google, do the following:',
      '1) Replace the <YOUR_FULFILLMENT_URL> with yours in action.json file.',
      '2) Register: `gactions update --action_package action.json --project <YOUR_ACTION_PROJECT_ID>`'
    ],
    'CodelabLevel1': [
      '',
      '[Codelab Level 1]',
      'Open the Actions on Google Codelab Level 1 page from the URL below:',
      '',
      'https://codelabs.developers.google.com/codelabs/actions-1/',
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Firebsae project: `firebase use <YOUR_PROJECT_ID>`',
      '2) Change the directory: `cd functions`',
      '3) Deploy: `npm run deploy` or `yarn deploy`'
    ],
    'CodelabLevel2': [
      '',
      '[Codelab Level 2]',
      'Open the Actions on Google Codelab Level 2 page from the URL below:',
      '',
      'https://codelabs.developers.google.com/codelabs/actions-2/',
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Firebsae project: `firebase use <YOUR_PROJECT_ID>`',
      '2) Change the directory: `cd functions`',
      '3) Deploy: `npm run deploy` or `yarn deploy`'
    ],
    'CodelabLevel3': [
      '',
      '[Codelab Level 3]',
      'Open the Actions on Google Codelab Level 3 page from the URL below:',
      '',
      'https://codelabs.developers.google.com/codelabs/actions-3/',
      '',
      '[Deploying Your Fulfillment]',
      'To deploy your fulfillment, do the following:',
      '1) Set Firebsae project: `firebase use <YOUR_PROJECT_ID>`',
      '2) Change the directory: `cd functions`',
      '3) Deploy: `npm run deploy` or `yarn deploy`'
    ]
  }
};
