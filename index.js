const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

const port = process.env.PORT || 3000; // Fix: Correct order of port assignment

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const isPerfectNumber = (num) => {
    if (num < 1) return false;
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    return sum === num;
};

const isArmstrong = (num) => {
    let sum = 0, temp = Math.abs(num); 
    const numDigits = temp.toString().length;
    while (temp > 0) {
        sum += Math.pow(temp % 10, numDigits);
        temp = Math.floor(temp / 10);
    }
    return sum === Math.abs(num);
};

const digitSum = (num) => {
    return Math.abs(num).toString().split("").reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

// Function to check number properties
const checkNumberProperties = (num) => {
    return {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfectNumber(num),
    };
};

app.get('/api/classify-number', async (req, res) => {
    const userInput = req.query.number;
    const num = parseInt(userInput, 10);

    if (isNaN(num)) {
        return res.status(400).json({
            error: true,
            number: userInput,  // Display exact invalid input
            // message: "Invalid number input. Please provide a valid number."
        });
    }

    try {
        const triviaResponse = await axios.get(`https://numbersapi.com/${num}/math`);

        let properties = [];
        if (isArmstrong(num)) properties.push("armstrong");
        if (num % 2 === 0) properties.push("even");
        else properties.push("odd");
        // if (isPerfectNumber(num)) properties.push("perfect"); 

        // Get local number properties
        const numberProperties = checkNumberProperties(num);

        // Send combined response
        res.json({
            ...numberProperties,
            properties: properties,
            digit_sum: digitSum(num),
            fun_fact: triviaResponse.data
        });

    } catch (error) {
        res.status(500).json({ error: 'Error fetching trivia' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
