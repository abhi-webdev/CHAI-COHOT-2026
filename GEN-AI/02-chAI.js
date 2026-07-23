import { checkOpenAI } from "./01-chAI.js";

const client = await checkOpenAI()
const model = "gpt-4o-mini";

console.log(client.baseURL);

const response = await client.chat.completions.create({
    model,
    messages: [
        {
            role: "system",
            content: "You are a helpful assistant that provides information about that OpenAI API"
        },
        {
            role: "user",
            content: "Where should i travel in the world"
        }
    ]
})

console.log(response.choices[0].message.content);

const usege_stats = {
    prompt_tokens : response.usage.prompt_tokens,
    completion_tokens : response.usage.completion_tokens,
    total_token : response.usage.total_tokens
}


console.table(usege_stats);
