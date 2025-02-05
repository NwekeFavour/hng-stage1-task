# Number Classifier API  

This API classifies numbers based on their mathematical properties, such as **odd/even**, **prime**, **perfect**, and **Armstrong numbers**. It also calculates the **digit sum** and fetches a fun fact about the number from the **Numbers API**.  

## Features  

- **Classifies numbers into categories:**  
  - **Odd/Even**  
  - **Prime**  
  - **Perfect Number**  
  - **Armstrong Number**  

- **Calculates the digit sum** of the number.  
- **Fetches a math-related fun fact** about the number from the Numbers API.  

---

## API Endpoint  

### **GET `/api/classify-number?number=<number>`**  

#### **Query Parameters:**  
- `number` (required): The number to be classified.  

#### **Response Example:**  

```json
{
    "number": 153,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["odd", "Armstrong"],
    "digit_sum": 9,
    "fun_fact": "153 is a number that is equal to the sum of its own digits each raised to the power of the number of digits."
}
```

### **Properties Explained:**  
- **odd/even**: Determines whether the number is odd or even.  
- **prime**: Checks if the number is a prime number.  
- **perfect**: Checks if the number is a perfect number (sum of its divisors equals the number).  
- **Armstrong**: Checks if the number is an Armstrong number (sum of its digits raised to the power of the number of digits equals the number).  
- **digit_sum**: Sum of all digits of the number.  
- **fun_fact**: A math-related trivia fetched from [Numbers API](http://numbersapi.com).  

---

## Installation & Setup  

### **Prerequisites**  
- Install [Node.js](https://nodejs.org/)  

### **Steps to Run Locally**  

1. **Clone the repository**  

   ```bash
   git clone https://github.com/NwekeFavour/hng-stage1-task
   cd hng-stage1-task
   ```

2. **Install dependencies**  

   ```bash
   npm install
   ```

3. **Start the server**  

   ```bash
   npm start
   ```

   The API will now run on `http://localhost:3000`.  

---

## Usage Example  

To classify the number **153**, send a `GET` request:  

```
GET http://localhost:3000/api/classify-number?number=153
```

#### **Response:**  
```json
{
    "number": 153,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["odd", "Armstrong"],
    "digit_sum": 9,
    "fun_fact": "153 is an Armstrong number."
}
```

---

## Error Handling  

If an invalid number (e.g., a letter) is passed, the API returns:  

```json
{
    "number": "alphabet",
    "error": "true"
}
```

---

## License  

This project is licensed under the MIT License.  
