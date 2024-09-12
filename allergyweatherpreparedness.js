let zipCodeInput = document.getElementById("zipcode");
require ('dotenv').config();

async function getCurrentAPI(params) {
    console.log("Hello from Allergy Weather Preparedness APP!");
    let zipCde = zipCodeInput.value;
    let apiKey = process.env.API_KEY; 
    try {
        let result = await fetch(``)
        if (!result.ok) {
            throw new Error("Check Zip or Postal Code.")
        }
        let data = await result.json();
        console.log(data);

    }
}