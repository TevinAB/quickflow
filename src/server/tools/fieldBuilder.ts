import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import {
  FORM_FIELD_TYPES,
  SEARCH_SOURCES,
  FORM_FIELD_PERMISSION_KEYS,
} from 'src/constants';
import { capitalizeWord, toCamelCase } from 'src/utils';

type Answer = Record<string, any>;

const questions = [
  {
    type: 'input',
    name: 'inputLabel',
    message: 'Form Field Label?',
    filter(input: string) {
      return input
        .split(' ')
        .map((word) => capitalizeWord(word))
        .join(' ');
    },
  },
  {
    type: 'list',
    name: 'inputType',
    message: 'Field Type?',
    choices: FORM_FIELD_TYPES,
  },
  {
    type: 'confirm',
    name: 'public',
    message: 'Should field be public?',
    default: true,
  },
  {
    type: 'input',
    name: 'name',
    message: 'Field Name?',
    default(answers: Answer) {
      //add underscore to private fields
      if (!answers['public'] as boolean) {
        return '_' + toCamelCase(answers['inputLabel'] as string);
      } else {
        return toCamelCase(answers['inputLabel'] as string);
      }
    },
  },
  {
    type: 'input',
    name: 'helpText',
    message: 'Help text about field?',
  },
  {
    type: 'list',
    name: 'searchSource',
    message: 'Source to use for searches?',
    choices: SEARCH_SOURCES,
    when(answers: Answer) {
      return answers['inputType'] === 'Search';
    },
  },
  {
    type: 'input',
    name: 'listSource',
    message: 'List Source?',
    when(answers: Answer) {
      return answers['inputType'] === 'Picklist';
    },
  },
  {
    type: 'input',
    name: 'validation',
    message: 'Rules used to validate this field?',
    default() {
      return [];
    },
  },
  {
    type: 'confirm',
    name: 'editInputType',
    message: 'Can the input type be changed after creation?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'editInputLabel',
    message: 'Can the input label be changed after creation?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'editHelpText',
    message: 'Can the help text be changed after creation?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'editListSource',
    message: 'Can the list source be changed after creation?',
    default: false,
    when(answers: Answer) {
      return answers['inputType'] === 'Picklist';
    },
  },
  {
    type: 'confirm',
    name: 'editSearchSource',
    message: 'Can the search source be changed after creation?',
    default: false,
    when(answers: Answer) {
      return answers['inputType'] === 'Search';
    },
  },
  {
    type: 'confirm',
    name: 'isDeletable',
    message: 'Can the field be deleted after creation?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'editValidation',
    message: 'Can the validation rules be changed after creation?',
    default: false,
  },
];

async function runPrompts() {
  const fieldAnswers: Answer = {};

  //prompt for meta-data
  const metaQuestions = [
    {
      type: 'input',
      name: 'fileName',
      message: 'What is the name of this file?',
    },
    {
      type: 'input',
      name: 'filePath',
      message: 'Where should this file be saved?',
    },
    {
      type: 'number',
      name: 'numberOfFields',
      message: 'How many fields should be created?',
    },
  ];

  const metaAnswers = (await inquirer.prompt(metaQuestions)) as Answer;
  console.clear();

  const numberOfFields = metaAnswers['numberOfFields'] as number;
  for (let i = 0; i < numberOfFields; i++) {
    const answers = (await inquirer.prompt(questions)) as Answer;
    fieldAnswers[`field${i}`] = answers;
    console.clear();
  }

  //create formData
  const fieldData = getFieldData(fieldAnswers);
  const fileName = metaAnswers['fileName'] as string;
  const fileUrl = metaAnswers['filePath'];

  //create .ts file with formatted data
  const code = `
    const fields = ${JSON.stringify(fieldData)};
    export default fields;
  `;

  const finalFileUrl = path.resolve(fileUrl, `${fileName}.ts`);
  fs.writeFile(finalFileUrl, code, (error) => {
    if (error) throw error;
    console.log('File created.');
  });
}

function getFieldData(fieldAnswers: Answer) {
  const result: Array<Record<string, any>> = [];
  const permissionKeys = Object.keys(FORM_FIELD_PERMISSION_KEYS);

  //get the data for each field inside field answers
  const fields = Object.values(fieldAnswers) as Array<Record<string, any>>;

  for (let field of fields) {
    //get properties inside the field object
    const formattedField: Record<string, any> = {
      permissions: {},
    };
    for (let key in field) {
      if (field.hasOwnProperty(key)) {
        if (permissionKeys.includes(key)) {
          formattedField['permissions'][key] = field[key];
        } else {
          formattedField[key] = field[key];
        }
      }
    }
    result.push(formattedField);
  }

  return result;
}

runPrompts();
