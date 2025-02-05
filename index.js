const express = require("express")
const app = express()
const cors = require("cors")
const axios = require("axios")

app.use(cors())

const port = 3000 || process.env.PORT

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
    let sum = 0, temp = num;
    const numDigits = num.toString().length;
    while (temp > 0) {
        sum += Math.pow(temp % 10, numDigits);
        temp = Math.floor(temp / 10);
    }
    return sum === num;
};

const digitSum = (num) => {
    return num.toString().split("").reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

// Function to check number properties
const checkNumberProperties = (num) => {
    return {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfectNumber(num),
    };
};

// Route to check number properties & fetch trivia from Numbers API
app.get('/api/classify-number', async (req, res) => {
    const num = parseInt(req.query.number, 10);

    if (isNaN(num)) {
        return res.status(400).json({ number: 'alphabet', error: 'true' });
    }

    try {
        // Fetch number trivia from Numbers API
        const triviaResponse = await axios.get(`http://numbersapi.com/${num}/math`);
        

        let properties = [];
        if (num % 2 === 0) properties.push("even");
        else properties.push("odd");
        if (isPerfectNumber(num)) properties.push("perfect");
        if (isArmstrong(num)) properties.push("Armstrong");
        // Get local number properties
        const numberProperties = checkNumberProperties(num);

        // Send combined response
        res.json({
            ...numberProperties,
            properties:  properties,
            digit_sum: digitSum(num),
            fun_fact: triviaResponse.data
        });

    } catch (error) {
        res.status(500).json({ error: 'Error fetching trivia' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
}) 