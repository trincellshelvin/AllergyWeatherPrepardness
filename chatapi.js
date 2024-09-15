const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getAIResponse(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
    });
    console.log(response.data.choices[0].text);
}

getAIResponse("Hello, how can I help you today?");
