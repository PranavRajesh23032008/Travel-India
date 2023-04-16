import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.chatgpt_api_key,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    max_tokens: 2048,
    temperature: 0.8,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(input) {
  return input;
}
