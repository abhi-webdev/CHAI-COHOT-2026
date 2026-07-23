import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const apiKeyChecker = () => {
  if (!API_KEY) {
    console.log('Error: Open AI key is not set in environment variable');
    process.exit(1);
  }
};

export const checkOpenAI = async () => {
  apiKeyChecker();
  const openai = (await import('openai')).default;
  const client = new openai.OpenAI({
    apiKey: API_KEY,
  });
  if (!client) {
    console.log('client Initilize failed ');
    process.exit(1);
  }

  console.log('OpenAI client initilize succesfully');

  return client;
};
