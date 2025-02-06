const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

const port = process.env.PORT || 3000;

// Optimized Prime Check (Skip even numbers except 2)
const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2) return true; // 2 is the only even prime number
    if (num % 2 === 0) return false; // Skip all even numbers

    for (let i = 3; i <= Math.sqrt(num); i += 2) { // Check only odd numbers
        if (num % i === 0) return false;
    }
    return true;
};

// Optimized Perfect Number Check (Stop if sum exceeds num)
const isPerfectNumber = (num) => {
    if (num < 1) return false;
    let sum = 1; // Start from 1 since every number is divisible by 1
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i + (i !== num / i ? num / i : 0); // Add both factors
        }
        if (sum > num) return false; // Early exit
    }
    return sum === num;
};

// Optimized Armstrong Check (Break if sum exceeds num)
const isArmstrong = (num) => {
    let sum = 0, temp = Math.abs(num);
    const numDigits = temp.toString().length;

    while (temp > 0) {
        sum += Math.pow(temp % 10, numDigits);
        if (sum > Math.abs(num)) return false; // Early exit if sum exceeds num
        temp = Math.floor(temp / 10);
    }
    return sum === Math.abs(num);
};

// Compute digit sum
const digitSum = (num) => {
    return Math.abs(num).toString().split("").reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

// Compute number properties
const checkNumberProperties = (num) => ({
    number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfectNumber(num),
});

app.get('/api/classify-number', async (req, res) => {
    const userInput = req.query.number;
    const num = parseInt(userInput, 10);

    if (isNaN(num)) {
        return res.status(400).json({ error: true, number: userInput });
    }

    // Start timer for performance tracking
    const startTime = process.hrtime();

    // Compute number properties
    const numberProperties = checkNumberProperties(num);
    let properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    // Fetch trivia with timeout (max 500ms)
    const fetchTrivia = async () => {
        try {
            const response = await axios.get(`http://numbersapi.com/${num}/math`, { timeout:500 });
            return response.data;
        } catch {
            return "Trivia not available (Timeout exceeded)";
        }
    };

    // Execute the API call with a timeout safeguard
    const triviaPromise = fetchTrivia();

    // Wait for the result but ensure timeout
    const funFact = await Promise.race([
        triviaPromise,
        new Promise((resolve) => setTimeout(() => resolve("Trivia fetch timeout"), 400))
    ]);


    // Final response
    res.json({
        ...numberProperties,
        properties,
        digit_sum: digitSum(num),
        fun_fact: funFact,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
