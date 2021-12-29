import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import publicFields from 'src/server/meta/publicFields';
import privateFields from 'src/server/meta/privateFields';

type Answer = Record<string, any>;

const loopConditionKey = 'addField';
const allFormFields = generateFieldList([...publicFields, ...privateFields]);

const questions = [
  {
    type: 'list',
    name: 'name',
    message: 'Select a field',
    choices: allFormFields,
  },
  {
    type: 'confirm',
    name: 'removable',
    message: 'Is field removable?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'reorderable',
    message: 'Is field reorderable?',
    default: true,
  },
  {
    type: 'confirm',
    name: loopConditionKey,
    message: 'Add another field?',
    default: true,
  },
];

async function runPrompts() {
  //prompt for meta-data
  const metaQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'Field Display name?',
    },
    {
      type: 'input',
      name: 'fileName',
      message: 'File name?',
    },
    {
      type: 'input',
      name: 'filePath',
      message: 'Where should this file be saved?',
    },
  ];

  const metaAnswers = (await inquirer.prompt(metaQuestions)) as Answer;
  console.clear();

  const fieldDisplay: Answer = {
    name: metaAnswers['name'],
    form: [],
    table: [],
    infoBox: [],
  };

  fieldDisplay.form = await loopQuestions(
    questions,
    loopConditionKey,
    '---Form---'
  );

  fieldDisplay.table = await loopQuestions(
    questions,
    loopConditionKey,
    '---Table---'
  );

  fieldDisplay.infoBox = await loopQuestions(
    questions,
    loopConditionKey,
    '---InfoBox---'
  );

  //create formData
  const fileName = metaAnswers['fileName'] as string;
  const fileUrl = metaAnswers['filePath'];

  //create .ts file with formatted data
  const code = `
    const ${fieldDisplay.name} = ${JSON.stringify(fieldDisplay)};
    export default ${fieldDisplay.name};
  `;

  const finalFileUrl = path.resolve(fileUrl, `${fileName}.ts`);
  fs.writeFile(finalFileUrl, code, (error) => {
    if (error) throw error;
    console.log('File created.');
  });
}

async function loopQuestions(
  questions: Array<Object>,
  loopConditionKey: string,
  currentSection: string
) {
  const result: Array<Answer> = [];

  let shouldAskQuestions = true;
  while (shouldAskQuestions) {
    console.log(currentSection);

    const answers = (await inquirer.prompt(questions)) as Answer;
    shouldAskQuestions = answers[loopConditionKey];

    //no reason to include loopCondition in final answer object.
    delete answers[loopConditionKey];
    result.push(answers);

    console.clear();
  }

  return result;
}

function generateFieldList(fields: Array<{ name: string }>) {
  const result: Array<string> = [];

  for (let field of fields) {
    result.push(field.name);
  }

  return fields;
}

runPrompts();
