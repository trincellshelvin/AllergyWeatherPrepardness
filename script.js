let inferenceEndpoint = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";

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

function chatBubble() {
    var chatBubble = document.getElementById('chatBubble');
    var chatContent = document.getElementById('chatContent');
    if (chatBubble.classList.contains('expanded')) {
        chatBubble.classList.remove('expanded');
        chatContent.style.display = 'none';
    } else {
        chatBubble.classList.add('expanded');
        chatContent.style.display = 'block';
    }
};

document.getElementById('chatImage').addEventListener('click', function() {
    const chatContent = document.getElementById('chatContent');
    chatContent.style.display = chatContent.style.display === 'none' ? 'block' : 'none';
});


document.getElementById('submitButton').addEventListener('click', async function() {
    var userInput = document.getElementById('userInput').value;
    var responseContainer = document.getElementById('responseContainer');
    var results = await searchWeb(userInput);
    responseContainer.innerHTML = results.map(result => `<p><a href="${result.link}" target="_blank">${result.title}</a></p>`).join('');

    // Add the response message
    const responseMessage = document.createElement('p');
    responseMessage.textContent = "Here are your search results...";
    responseContainer.appendChild(responseMessage);

    // Clear the input field
    document.getElementById('userInput').value = '';
    
    // Append the response to the response container
    responseContainer.appendChild(responseContainer);
});

async function searchWeb(query) {
    let apiKey = "AIzaSyBVv4z5avr0tO9dFY2eJ7cAjNidESYy3qw";
    let cx = "d05bf053e1051432e";
    let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.items) {
        return data.items.map(item => ({ title: item.title, link: item.link }));
    } else {
        return [{ title: "No results found", link: "#" }];
    }
};

