async function fetchFoodData(userInput, region, language, includeFoodData, eatenFoods) {
    const apiKey = 'YOUR_API_KEY';
    const apiSecret = 'YOUR_API_SECRET';
    const url = 'https://platform.fatsecret.com/rest/server.api';

    const params = new URLSearchParams({
        method: 'foods.search',
        format: 'json',
        oauth_consumer_key: apiKey,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_nonce: Math.random().toString(36).substring(7),
        oauth_version: '1.0',
        oauth_signature: apiSecret,
        search_expression: userInput,
        region: region,
        language: language,
        include_food_data: includeFoodData,
        eaten_foods: JSON.stringify(eatenFoods)
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: params
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const userInput = document.getElementById('query').value;
    const region = 'US';
    const language = 'en';
    const includeFoodData = true;
    const eatenFoods = [
        {
            food_id: 3092,
            food_name: 'egg',
            brand: null,
            serving_description: '',
            serving_size: 1
        }
    ];
    const resultsDiv = document.getElementById('results');

    try {
        const data = await fetchFoodData(userInput, region, language, includeFoodData, eatenFoods);
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = 'Error fetching data. Please try again.';
    }
});