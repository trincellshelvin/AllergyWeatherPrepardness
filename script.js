let inferenceEndpoint = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";
let aiName = "Preppy";

function greetUser() {
    return `Welcome to Allergy & Weather Preparedness! Hi, I am ${aiName}, what can I search for you today?`;
}

console.log(greetUser());

async function fetchOpenAIResponse(prompt) {
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

function getUserQuery() {
    let userQuery = prompt("Click to Ask a Question...");
    searchWeb(userQuery).then(results => {
        console.log(results);
        return results;
    });
}

let chatBubble = document.getElementById('chatBubble');

chatBubble.addEventListener('click', function () {
    this.classList.toggle('expanded');
});

async function searchWeb(query) {
    let apiKey = "AIzaSyBVv4z5avr0tO9dFY2eJ7cAjNidESYy3qw";
    let cx = "d05bf053e1051432e";
    let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.items) {
        return data.items.map(item => item.title);
    } else {
        return ["No results found"];
    }
}

function handleSearch() {
    let query = prompt("Click to Ask a Question...");
    searchWeb(query).then(results => {
        console.log(results);
    });
}

console.log(searchWeb());
return searchWeb(query);
