async function fetchOpenAI(prompt){
    let token = localStorage.getItem("token");
    let url = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it/v1/chat/completions";
    let payload = {
        model: "google/gemma-2-2b-it",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
    }
};

let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
headers: {
    'Authorization': `FineGrained ${token}`,
    'Content-Type': 'application/json'
}
});
console.log(result)

let data = await result.json();
console.log(data);
let message = data.choices[0].message.content;
console.log(message);
return message;

