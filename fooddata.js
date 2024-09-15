const axios = require('axios');

async function fetchFoodData(query) {
    const apiKey = 'YOUR_API_KEY';
    const apiSecret = 'YOUR_API_SECRET';
    const url = 'https://platform.fatsecret.com/rest/server.api';

    try {
        const response = await axios.post(url, null, {
            params: {
                method: 'foods.search',
                format: 'json',
                oauth_consumer_key: apiKey,
                oauth_signature_method: 'HMAC-SHA1',
                oauth_timestamp: Math.floor(Date.now() / 1000),
                oauth_nonce: Math.random().toString(36).substring(7),
                oauth_version: '1.0',
                oauth_signature: apiSecret,
                search_expression: query
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('query').value;
    const resultsDiv = document.getElementById('results');

    try {
        const data = await fetchFoodData(query);
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = 'Error fetching data. Please try again.';
    }
});
