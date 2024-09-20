let inferenceEndpoint = "https://api-inference.huggingface.co/models/google/gemma-1.1-2b-it";
let aiName = "Preppy";

function greetUser() {
    return `Welcome to Allergy & Weather Preparedness! I am ${aiName}, what can I search for you today?`
}

console.log(greetUser());

function fetchOpenAI(query) {
    let userQuery = prompt("Click to Ask a Question...");
    searchWeb(userQuery).then(results => {
        console.log(results);
        return results
    })
}
let chatBubble = document.getElementById('chatBubble');

chatBubble.addEventListener('click', function () {
    this.classList.toggle('expanded');
});

async function fetchOpenAI(prompt) {
    let token = localStorage.getItem("token");
    let url = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it/v1/chat/completions";
    let payload = {
        model: "google/gemma-2-2b-it",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        stream: false
    };

    let result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    let data = await result.json();
    console.log(data);
    let message = data.choices[0].message.content;
    console.log(message);
    return message;
}

