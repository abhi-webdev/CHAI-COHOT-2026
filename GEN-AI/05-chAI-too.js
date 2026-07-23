import { checkOpenAI } from './01-chAI.js';
import { calculator, calculateTool } from './tools/calculator-tool.js';

const client = await checkOpenAI();
const model = 'gpt-4o-mini';

console.log(client.baseURL);

const tool = [calculateTool];

const messages = [
  {
    role: 'user',
    content:
      'what is the result of adding 23 and 50',
  },
];

const response = await client.chat.completions.create({
  model,
  messages,
  tool_choice: 'auto',
  tools,
});

console.log("+++++++++ First Response +++++++++++");

const assistantMessage = response.choices[0].message;

console.log(assistantMessage);
console.log(assistantMessage.tool_calls);

messages.push(assistantMessage)
